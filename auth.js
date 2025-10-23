import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';

const authContainer = document.getElementById('auth-container');
const uploadContainer = document.getElementById('upload-container');
const logoutButton = document.getElementById('logout-button');
const signUpButton = document.getElementById('signup-button');
const logInButton = document.getElementById('login-button');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error("Error signing up:", error);
            alert(error.message);
        });
});

logInButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.error("Error logging in:", error);
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
        authContainer.style.display = 'block';
        uploadContainer.style.display = 'none';
        logoutButton.style.display = 'none';
    }
});