Generate the initial project structure for a new social media web application named "PhotoFeed".

This project must use the following Firebase services with the v9 modular SDK:
1.  **Firebase Authentication**
2.  **Firebase Realtime Database**
3.  **Firebase Hosting**

Create the following files:

1.  **`index.html`**:
    * Set the page title to "PhotoFeed".
    * Create a header that contains a simple logo (the letter "P") and the project title "PhotoFeed".
    * Create a main content area with three empty `div` containers:
        * `&lt;div id="auth-container"&gt;` (for login/signup)
        * `&lt;div id="upload-container"&gt;` (for creating new posts)
        * `&lt;div id="feed-container"&gt;` (for the main feed)

2.  **`style.css`**:
    * Create basic styling for the header, logo, and the three main containers to ensure they are visually distinct and organized.

3.  **`firebase-config.js`**:
    * Create a file to hold the Firebase configuration and initialization code (using the v9 modular SDK). Leave placeholders for the API keys.

4.  **`prompts.md`**:
    * Create an empty file in the root directory named `prompts.md`. This file will be used to log all prompts[cite: 51, 52].

Initialize the project for Firebase Hosting.

---

Using the Firebase v9 modular SDK and the files from the previous step, generate the complete UI and logic for user authentication.

1.  **HTML (Update `index.html`):**
    * Inside the `&lt;div id="auth-container"&gt;`, create a form for user authentication.
    * The form should include:
        * An email input.
        * A password input.
        * A "Sign Up" button.
        * A "Log In" button.
    * Somewhere on the page (e.g., in the header), add a "Log Out" button with `id="logout-button"`. This button should be hidden by default.

2.  **JavaScript (Create `auth.js`):**
    * Create a new file named `auth.js`.
    * Import the `auth` object from `./firebase-config.js`.
    * Import all necessary functions from `firebase/auth` (e.g., `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`).
    * Add event listeners to the "Sign Up", "Log In", and "Log Out" buttons.
    * Implement the `onAuthStateChanged` listener to manage user sessions[cite: 37]. This listener must:
        * If a user is logged in: Hide `&lt;div id="auth-container"&gt;` and show `&lt;div id="upload-container"&gt;` and the "Log Out" button.
        * If no user is logged in: Show `&lt;div id="auth-container"&gt;` and hide `&lt;div id="upload-container"&gt;` and the "Log Out" button.

3.  **HTML (Update `index.html`):**
    * Link the new `auth.js` file in `index.html` as a module (`&lt;script type="module" src="auth.js"&gt;&lt;/script&gt;`). Make sure it is loaded *after* `firebase-config.js`.