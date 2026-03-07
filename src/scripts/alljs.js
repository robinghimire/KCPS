const contentStartTime = { start_time };
const contentType = '{{ content_type }}';
const contentTitle = '{{ object.title }}';

let scrollDepth = 0;
let videoProgress = 0;

// Track scroll depth for posts/documents
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollDepth = Math.max(scrollDepth, Math.round(scrollPercent));
});

// Track video progress
function updateVideoProgress(event) {
    if (event.target.duration) {
        videoProgress = Math.round((event.target.currentTime / event.target.duration) * 100);
    }
}

// Send tracking data on page leave
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() / 1000) - contentStartTime);
    const completion = contentType === 'video' ? videoProgress : scrollDepth;
    
    navigator.sendBeacon('/track-view/', JSON.stringify({
        content_type: contentType,
        content_title: contentTitle,
        time_spent: timeSpent,
        completion: completion
    }));
});

// Video tracking
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('timeupdate', updateVideoProgress);
});

// Dashboard / admin Script 


