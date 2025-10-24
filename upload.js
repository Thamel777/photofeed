import { auth, database } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, push, set, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const apiKey = '3e514b5398fce22d30f0bbc8045b2a84'; // NOTE: Replace with your ImgBB API key

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (result.success) {
        return result.data.url;
    } else {
        throw new Error(result.error.message);
    }
}

document.getElementById('create-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = document.getElementById('post-image').files[0];
    const caption = document.getElementById('post-caption').value;
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.error('No user is logged in.');
        return;
    }

    try {
        const imageUrl = await uploadImage(file);
        const postData = {
            userId: currentUser.uid,
            caption: caption,
            imageUrl: imageUrl,
            timestamp: serverTimestamp(),
        };

        const newPostRef = push(ref(database, 'posts'));
        await set(newPostRef, postData);

        alert('Post created!');
        document.getElementById('create-post-form').reset();
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
    }
});
