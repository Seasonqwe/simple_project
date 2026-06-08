// script.js - Anime Scene Gallery Logic

// Data: Anime titles and their corresponding video URLs
// Replace these placeholder videos with real anime scene clips (short looping clips work best)
// script.js - Anime Scene Gallery with Multiple Previews

// Updated data structure: Each anime can have multiple scenes/videos
// script.js - Two Previews (Left + Right of Title)

const animes = [
    {
        title: "DEMON SLAYER",
        scenes: [
            "THIS IS 4K ANIME (Tengen Uzui).mp4",
            "THIS IS 4K ANIME (Tanjiro) - T2.mp4"
        ]
    },
    {
        title: "A SILENT VOICE",
        scenes: [
            "asilentvoice1.mp4",
            "The-Best-A-Silent-Voice-Edit-.mp4"
        ]
    },
    {
        title: "ATTACK ON TITAN",
        scenes: [
            "I-Reject-That-Wish_.mp4",
            "https://assets.mixkit.co/videos/preview/754/754-small.mp4"
        ]
    },
    {
        title: "SPIRITED AWAY",
        scenes: [
            "https://assets.mixkit.co/videos/preview/512/512-small.mp4",
            "https://assets.mixkit.co/videos/preview/343/343-small.mp4"
        ]
    },
    {
        title: "ONE PIECE",
        scenes: [
            "https://assets.mixkit.co/videos/preview/234/234-small.mp4",
            "https://assets.mixkit.co/videos/preview/123/123-small.mp4"
        ]
    }
];

/* CONFIGURATION */
const CONFIG = {
    previewWidth: 300,
    previewHeight: 170,
    horizontalGap: 60,      // Space between title and preview
    verticalOffset: 20      // How much to shift previews up/down from title center
};

const titlesContainer = document.getElementById('titles');
let activePreviews = [];

/**
 * Initialize the gallery
 */
function init() {
    animes.forEach((anime, index) => {
        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.textContent = anime.title;
        titleEl.dataset.index = index;

        titleEl.addEventListener('mouseenter', (e) => showTwoPreviews(e, anime));
        titleEl.addEventListener('mouseleave', hideAllPreviews);

        titlesContainer.appendChild(titleEl);
    });
}

/**
 * Show exactly TWO previews - one on LEFT, one on RIGHT
 */
function showTwoPreviews(e, anime) {
    hideAllPreviews();

    if (anime.scenes.length < 2) {
        console.warn("Not enough scenes for", anime.title);
        return;
    }

    const rect = e.target.getBoundingClientRect();
    const centerY = rect.top + window.scrollY + (rect.height / 2) - (CONFIG.previewHeight / 2);

    // Left Preview (Scene 1)
    const leftPreview = createPreview(anime.scenes[0]);
    leftPreview.style.left = `${rect.left - CONFIG.previewWidth - CONFIG.horizontalGap}px`;
    leftPreview.style.top = `${centerY + CONFIG.verticalOffset}px`;
    document.body.appendChild(leftPreview);
    activePreviews.push(leftPreview);

    // Right Preview (Scene 2)
    const rightPreview = createPreview(anime.scenes[1]);
    rightPreview.style.left = `${rect.right + CONFIG.horizontalGap}px`;
    rightPreview.style.top = `${centerY - CONFIG.verticalOffset}px`;
    document.body.appendChild(rightPreview);
    activePreviews.push(rightPreview);

    // Play both videos
    setTimeout(() => {
        leftPreview.querySelector('video').play().catch(() => {});
        rightPreview.querySelector('video').play().catch(() => {});
    }, 50);
}

/**
 * Create a single preview
 */
function createPreview(videoUrl) {
    const preview = document.createElement('div');
    preview.className = 'preview active';

    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.src = videoUrl;

    preview.appendChild(video);
    return preview;
}

/**
 * Hide all previews
 */
function hideAllPreviews() {
    activePreviews.forEach(preview => {
        const video = preview.querySelector('video');
        if (video) video.pause();
        preview.remove();
    });
    activePreviews = [];
}

// Start
document.addEventListener('DOMContentLoaded', init);