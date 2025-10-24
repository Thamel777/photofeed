import { database } from './firebase-config.js';
import { ref, onValue, query, orderByChild, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

async function getUserData(userId) {
    const userRef = ref(database, 'users/' + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        const userData = snapshot.val();
        return {
            username: userData.username,
            profileImageUrl: userData.profileImageUrl,
        };
    } else {
        return {
            username: 'Anonymous',
            profileImageUrl: 'https://via.placeholder.com/40' // Default placeholder
        };
    }
}

const feedContainer = document.getElementById('feed-container');
const postsRef = query(ref(database, 'posts'), orderByChild('timestamp'));

onValue(postsRef, async (snapshot) => {
    feedContainer.innerHTML = '<h2>Main Feed</h2>';
    const posts = [];
    snapshot.forEach((childSnapshot) => {
        posts.push(childSnapshot.val());
    });
    posts.reverse(); // Show newest posts first

    for (const postData of posts) {
        const userData = await getUserData(postData.userId);
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        postCard.innerHTML = `
            <div class="post-header">
                <img src="${userData.profileImageUrl}" class="post-profile-pic">
                <span class="post-username">${userData.username}</span>
            </div>
            <img src="${postData.imageUrl}" class="post-image">
            <p class="post-caption">${postData.caption}</p>
        `;

        feedContainer.appendChild(postCard);
    }
});
