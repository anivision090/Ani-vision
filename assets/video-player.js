// Video Player Module
class VideoPlayer {
    constructor() {
        // DOM Elements
        this.videoPlayer = document.getElementById('videoPlayer');
        this.videoTitle = document.getElementById('videoTitle');
        this.videoCategory = document.getElementById('videoCategory');
        this.videoCounter = document.getElementById('videoCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        
        // State
        this.currentVideoIndex = 0;
        this.currentVideoCategory = 'all';
        this.currentVideos = videoData.all;
        this.currentVideoId = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        console.log("🎬 Video Player initialized");
        
        // Add event listeners for buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.playPrevious());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.playNext());
        }
        
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.handleDownload());
        }
    }
    
    // Show video player
    showVideoPlayer() {
        console.log("📺 Showing video player");
        
        // Hide home section
        document.getElementById('homeSection').classList.add('hidden');
        
        // Show video section
        document.getElementById('videoSection').classList.remove('hidden');
        
        // Play first video
        this.playVideo(0);
        
        // Show category status
        document.getElementById('categoryStatus').classList.remove('hidden');
        
        // Scroll to video
        setTimeout(() => {
            document.getElementById('videoSection').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 300);
    }
    
    // Play video by index
    playVideo(index) {
        if (!this.currentVideos || this.currentVideos.length === 0) {
            console.error("❌ No videos available");
            return;
        }
        
        // Handle index boundaries
        if (index < 0) index = this.currentVideos.length - 1;
        if (index >= this.currentVideos.length) index = 0;
        
        this.currentVideoIndex = index;
        const video = this.currentVideos[this.currentVideoIndex];
        
        console.log(`▶️ Playing: ${video.title}`);
        
        // Update iframe src
        if (this.videoPlayer) {
            this.videoPlayer.src = video.url;
        }
        
        // Update UI
        this.updateVideoInfo(video);
        
        // Store current video ID for download
        this.currentVideoId = video.id;
    }
    
    // Play previous video
    playPrevious() {
        if (this.currentVideoCategory === 'best') {
            this.showBestMessage();
            return;
        }
        
        this.playVideo(this.currentVideoIndex - 1);
    }
    
    // Play next video
    playNext() {
        if (this.currentVideoCategory === 'best') {
            this.showBestMessage();
            return;
        }
        
        this.playVideo(this.currentVideoIndex + 1);
    }
    
    // Update video information
    updateVideoInfo(video) {
        if (this.videoTitle) {
            this.videoTitle.textContent = video.title;
        }
        
        if (this.videoCategory) {
            this.videoCategory.textContent = categoryNames[video.category] || video.category;
        }
        
        if (this.videoCounter) {
            this.videoCounter.textContent = `${this.currentVideoIndex + 1} / ${this.currentVideos.length}`;
        }
    }
    
    // Handle download button
    handleDownload() {
        if (this.currentVideoCategory === 'best') {
            this.showBestMessage();
            return;
        }
        
        // Show download popup
        window.popupManager.showDownloadPopup(this.currentVideoId);
    }
    
    // Change category
    changeCategory(category) {
        console.log(`📂 Changing to category: ${category}`);
        
        this.currentVideoCategory = category;
        this.currentVideos = videoData[category] || [];
        this.currentVideoIndex = 0;
        
        // Update category status
        document.getElementById('currentCategory').textContent = categoryNames[category];
        
        // Show/hide clear filter button
        const clearFilter = document.getElementById('clearFilter');
        if (clearFilter) {
            clearFilter.style.visibility = (category === 'all') ? 'hidden' : 'visible';
        }
        
        // If video section is visible, update video
        if (!document.getElementById('videoSection').classList.contains('hidden')) {
            if (this.currentVideos.length > 0) {
                this.playVideo(0);
            } else {
                if (this.videoTitle) this.videoTitle.textContent = 'No videos available';
                if (this.videoCounter) this.videoCounter.textContent = '0 / 0';
            }
        }
    }
    
    // Show best message
    showBestMessage() {
        document.getElementById('bestMessage').classList.remove('hidden');
        document.getElementById('backdrop').classList.remove('hidden');
    }
}

// Create global video player instance
window.videoPlayer = new VideoPlayer();
console.log("✅ Video Player ready!");
