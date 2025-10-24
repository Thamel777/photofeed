import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';

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

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error("Error signing up:", error);
            alert(error.message);
        });
});

logoutButton.addEventListener('click', () => {
    signOut(auth);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        uploadContainer.style.display = 'block';
        logoutButton.style.display = 'block';
    } else {
        authContainer.style.display = 'flex';
        uploadContainer.style.display = 'none';
        logoutButton.style.display = 'none';
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
});