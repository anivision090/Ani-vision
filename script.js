// Main App Controller
class AniVisionApp {
    constructor() {
        // DOM Elements
        this.menuToggle = document.getElementById('menuToggle');
        this.getVideoBtn = document.getElementById('getVideoBtn');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.clearFilter = document.getElementById('clearFilter');
        
        // Initialize
        this.init();
    }
    
    init() {
        console.log("🚀 Ani Vision App initializing...");
        
        // Check if required modules are loaded
        this.checkDependencies();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize menu manager
        window.menuManager = new MenuManager();
        
        console.log("✅ Ani Vision App ready!");
    }
    
    // Check if all dependencies are loaded
    checkDependencies() {
        if (typeof videoData === 'undefined') {
            console.error("❌ video.js not loaded!");
            return false;
        }
        
        if (typeof window.videoPlayer === 'undefined') {
            console.error("❌ video-player.js not loaded!");
            return false;
        }
        
        if (typeof window.popupManager === 'undefined') {
            console.error("❌ popup.js not loaded!");
            return false;
        }
        
        console.log("✅ All dependencies loaded");
        return true;
    }
    
    // Setup event listeners
    setupEventListeners() {
        console.log("🔗 Setting up event listeners...");
        
        // Get Video Button
        if (this.getVideoBtn) {
            this.getVideoBtn.addEventListener('click', () => {
                console.log("🎬 Get Video button clicked");
                window.videoPlayer.showVideoPlayer();
            });
        } else {
            console.error("❌ Get Video button not found!");
        }
        
        // Category selection in menu
        if (this.menuItems.length > 0) {
            this.menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    const category = item.dataset.category;
                    this.handleCategoryClick(category, item);
                });
            });
        }
        
        // Clear filter button
        if (this.clearFilter) {
            this.clearFilter.addEventListener('click', () => {
                this.selectCategory('all');
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        console.log("✅ Event listeners set up");
    }
    
    // Handle category click
    handleCategoryClick(category, menuItem) {
        console.log(`📁 Category selected: ${category}`);
        
        // Update active menu item
        this.menuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
        
        // Handle special categories
        if (category === 'home') {
            this.goToHome();
            return;
        }
        
        if (category === 'history') {
            alert('History feature coming soon!');
            return;
        }
        
        if (category === 'best') {
            window.videoPlayer.showBestMessage();
            return;
        }
        
        // Change video category
        this.selectCategory(category);
    }
    
    // Select category
    selectCategory(category) {
        // Update category in video player
        window.videoPlayer.changeCategory(category);
        
        // Show category status
        document.getElementById('categoryStatus').classList.remove('hidden');
        
        // If on home page, switch to video player
        if (document.getElementById('homeSection') && 
            !document.getElementById('homeSection').classList.contains('hidden')) {
            window.videoPlayer.showVideoPlayer();
        }
    }
    
    // Go to home page
    goToHome() {
        document.getElementById('homeSection').classList.remove('hidden');
        document.getElementById('videoSection').classList.add('hidden');
        document.getElementById('categoryStatus').classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case 'Escape':
                window.popupManager.closeAllModals();
                break;
            case 'ArrowLeft':
                // Previous video
                if (!document.getElementById('videoSection').classList.contains('hidden')) {
                    window.videoPlayer.playPrevious();
                }
                break;
            case 'ArrowRight':
                // Next video
                if (!document.getElementById('videoSection').classList.contains('hidden')) {
                    window.videoPlayer.playNext();
                }
                break;
        }
    }
}

// Menu Manager Class
class MenuManager {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.sideMenu = document.getElementById('sideMenu');
        this.closeMenu = document.getElementById('closeMenu');
        this.backdrop = document.getElementById('backdrop');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        // Menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu button
        if (this.closeMenu) {
            this.closeMenu.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking outside (for mobile)
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                this.sideMenu && 
                !this.sideMenu.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                if (window.innerWidth <= 768) {
                    this.toggleMenu();
                }
            }
        });
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.sideMenu) {
            this.sideMenu.classList.toggle('active', this.isMenuOpen);
        }
        
        if (this.backdrop) {
            this.backdrop.classList.toggle('hidden', !this.isMenuOpen);
        }
        
        // Update menu icon
        const icon = this.menuToggle.querySelector('i');
        if (icon) {
            if (this.isMenuOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("📄 DOM fully loaded");
    window.aniVisionApp = new AniVisionApp();
});

// If DOM is already loaded
if (document.readyState === 'complete') {
    console.log("📄 DOM already loaded");
    window.aniVisionApp = new AniVisionApp();
}
