import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth, database } from './firebase-config.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { uploadImage } from './profile.js';

const authContainer = document.getElementById('auth-container');
const uploadContainer = document.getElementById('upload-container');
const logoutButton = document.getElementById('logout-button');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const showSignupLink = document.getElementById('show-signup-link');
const showLoginLink = document.getElementById('show-login-link');

showSignupLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLoginLink.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error("Error logging in:", error);
            alert(error.message);
        });
});



const handleSignUp = async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;
    const file = document.getElementById('signup-profile-pic').files[0];

    if (!file) {
        alert('Please select a profile image.');
        return;
    }

    try {
        console.log('Step 1: Uploading profile image...');
        const profileImageUrl = await uploadImage(file);
        console.log(`Step 1 Success: Image URL received: ${profileImageUrl}`);

        console.log('Step 2: Creating user in Firebase Auth...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`Step 2 Success: User created: ${user.uid}`);

        console.log('Step 3: Writing user data to Realtime Database...');
        await set(ref(database, 'users/' + user.uid), {
            username: username,
            profileImageUrl: profileImageUrl,
        });
        console.log('Step 3 Success: Database write complete.');

        console.log('Sign-up process successful!');

    } catch (error) {
        console.error('SIGN-UP FAILED:', error);
        alert(`Sign-up failed: ${error.message}`);
    }
};

signupForm.addEventListener('submit', handleSignUp);

logoutButton.addEventListener('click', () => {
    signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    const nav = document.querySelector('header nav');
    if (user) {
        nav.style.display = 'flex';
        authContainer.style.display = 'none';
    } else {
        nav.style.display = 'none';
        authContainer.style.display = 'flex';
    }
});