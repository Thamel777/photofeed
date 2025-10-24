const feedLink = document.getElementById('feed-link');
const uploadLink = document.getElementById('upload-link');
const profileLink = document.getElementById('profile-link');

const uploadContainer = document.getElementById('upload-container');
const profileContainer = document.getElementById('profile-container');
const feedContainer = document.getElementById('feed-container');

function hideAll() {
    uploadContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    feedContainer.style.display = 'none';
}

feedLink.addEventListener('click', () => {
    hideAll();
    feedContainer.style.display = 'block';
});

uploadLink.addEventListener('click', () => {
    hideAll();
    uploadContainer.style.display = 'block';
});

profileLink.addEventListener('click', () => {
    hideAll();
    profileContainer.style.display = 'block';
});