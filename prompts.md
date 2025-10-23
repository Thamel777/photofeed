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