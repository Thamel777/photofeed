import { auth, database } from './firebase-config.js';
import { ref, get, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const apiKey = '3e514b5398fce22d30f0bbc8045b2a84';

export async function uploadImage(file) {
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

async function fetchAndDisplayProfile(userId) {
    const userRef = ref(database, 'users/' + userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        const userData = snapshot.val();
        document.getElementById('profile-img-display').src = userData.profileImageUrl;
        document.getElementById('profile-username-display').innerText = userData.username;
        document.getElementById('update-username').value = userData.username;
    }
}

async function handleProfileUpdate(e) {
    e.preventDefault();

    const newUsername = document.getElementById('update-username').value;
    const file = document.getElementById('update-profile-pic').files[0];
    const uid = auth.currentUser.uid;

    const updates = {
        username: newUsername,
    };

    if (file) {
        const newImageUrl = await uploadImage(file);
        updates.profileImageUrl = newImageUrl;
    }

    await update(ref(database, 'users/' + uid), updates);

    console.log('Profile updated!');
    fetchAndDisplayProfile(uid);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchAndDisplayProfile(user.uid);
    }
});

document.getElementById('profile-update-form').addEventListener('submit', handleProfileUpdate);