// Popup Manager Module
class PopupManager {
    constructor() {
        // DOM Elements
        this.popupOverlay = document.getElementById('popupOverlay');
        this.downloadPopup = document.getElementById('downloadPopup');
        this.closePopup = document.getElementById('closePopup');
        this.qualityBtns = document.querySelectorAll('.quality-btn');
        this.okBtn = document.getElementById('okBtn');
        this.backdrop = document.getElementById('backdrop');
        
        // State
        this.currentDownloadVideoId = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        console.log("🎪 Popup Manager initialized");
        
        // Close popup button
        if (this.closePopup) {
            this.closePopup.addEventListener('click', () => this.closeDownloadPopup());
        }
        
        // Quality selection buttons
        if (this.qualityBtns.length > 0) {
            this.qualityBtns.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleQualitySelection(e));
            });
        }
        
        // OK button for best message
        if (this.okBtn) {
            this.okBtn.addEventListener('click', () => this.closeBestMessage());
        }
        
        // Close popup when clicking outside
        if (this.popupOverlay) {
            this.popupOverlay.addEventListener('click', (e) => {
                if (e.target === this.popupOverlay) {
                    this.closeDownloadPopup();
                }
            });
        }
        
        // Close backdrop when clicked
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.closeAllModals());
        }
    }
    
    // Show download popup
    showDownloadPopup(videoId) {
        this.currentDownloadVideoId = videoId;
        this.popupOverlay.classList.remove('hidden');
        this.backdrop.classList.remove('hidden');
    }
    
    // Close download popup
    closeDownloadPopup() {
        this.popupOverlay.classList.add('hidden');
        this.backdrop.classList.add('hidden');
        this.currentDownloadVideoId = null;
    }
    
    // Handle quality selection
    handleQualitySelection(event) {
        const quality = event.currentTarget.dataset.quality;
        console.log(`⬇️ Downloading video ${this.currentDownloadVideoId} in ${quality}`);
        
        // Simulate download
        this.simulateDownload(quality);
        
        // Close popup
        this.closeDownloadPopup();
    }
    
    // Simulate download
    simulateDownload(quality) {
        // Create download notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 2000;
                animation: slideIn 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            ">
                <i class="fas fa-check-circle"></i>
                Downloading in ${quality}...
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Log to console
        console.log(`✅ Download started: Video ${this.currentDownloadVideoId} in ${quality}`);
    }
    
    // Close best message
    closeBestMessage() {
        document.getElementById('bestMessage').classList.add('hidden');
        this.backdrop.classList.add('hidden');
    }
    
    // Close all modals
    closeAllModals() {
        this.closeDownloadPopup();
        this.closeBestMessage();
        
        // Also close menu if open
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu && sideMenu.classList.contains('active')) {
            window.menuManager.toggleMenu();
        }
    }
}

// Create global popup manager instance
window.popupManager = new PopupManager();
console.log("✅ Popup Manager ready!");
