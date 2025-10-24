## Prompt 1

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

## Prompt 2

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

## Prompt 3

Update the existing authentication component to include fields for "Username" and "Profile Image" in the sign-up form, and save this data to the Realtime Database.

1.  **HTML (Update `index.html`):**
    * Inside the `&lt;form id="signup-form"&gt;`:
        * Add an input for "Username": `&lt;input type="text" id="signup-username" placeholder="Username" required&gt;`
        * Add an input for "Profile Image": `&lt;input type="file" id="signup-profile-pic" accept="image/*" required&gt;`
    * Make sure the "Sign Up" button has an `id="signup-button"`.

2.  **JavaScript (Update `auth.js`):**
    * Import the `database` from `./firebase-config.js`.
    * Import `ref` and `set` from `"firebase/database"`.
    * Define a new function `handleSignUp` that will be called by the "Sign Up" button's event listener.
    * This function must perform 4 steps in order:
        1.  **Get Data:** Get `email`, `password`, `username`, and the `file` from the form inputs.
        2.  **Upload Image:** Upload the `file` to ImgBB.
            * Create an `uploadProfileImage` async function that:
                * Takes the `file` as an argument.
                * Uses `FormData` to append the `file` and your ImgBB API key. (Add a placeholder: `const apiKey = 'YOUR_IMGBB_API_KEY_GOES_HERE'`).
                * Uses `fetch` to POST to `https://api.imgbb.com/1/upload`.
                * Parses the JSON response and returns the `response.data.url`.
                * Handle any upload errors.
        3.  **Create User:** If the image upload is successful, `await` `createUserWithEmailAndPassword(auth, email, password)` to create the user in Firebase Authentication.
        4.  **Save to RTDB:** If the user is created successfully, get the `user.uid` from the result. Then, `await` `set(ref(db, 'users/' + user.uid), { username: username, profileImageUrl: profileImageUrl })` to save the new user's profile data to the Realtime Database.
    * Add `try...catch` blocks to handle errors for each step (e.g., image upload failed, email already in use, database write failed).
    * Modify the "Sign Up" event listener to call this new `handleSignUp` function.

3.  **CSS (Update `style.css`):**
    * Add basic styling to the new `input[type="file"]` to make it consistent with the other inputs.


---

## Prompt 4

Generate the complete functionality for creating new image posts and displaying them on a real-time chronological feed.

1.  **HTML (Update `index.html`):**
    * Inside the `<div id="upload-container">` (which is currently shown after login):
        * Add a heading: `<h2>Create a New Post</h2>`
        * Add a form: `<form id="create-post-form">`
        * Inside the form, add:
            * `<label for="post-image">Image:</label>`
            * `<input type="file" id="post-image" accept="image/*" required>`
            * `<label for="post-caption">Caption:</label>`
            * `<input type="text" id="post-caption" placeholder="Write a caption..." required>`
            * `<button type="submit">Create Post</button>`
        * `</form>`

2.  **JavaScript (Create `upload.js`):**
    * Create a new file `upload.js`.
    * Import `auth`, `database` from `./firebase-config.js`.
    * Import `onAuthStateChanged` from `firebase/auth`.
    * Import `ref`, `push`, `set`, `serverTimestamp` from `firebase/database`.
    * **ImgBB Upload Function:** Create an `async function uploadImage(file)` that takes a file, uses `FormData` and `fetch` to upload it to ImgBB, and returns the `response.data.url`.
        * Include a placeholder: `const apiKey = 'YOUR_IMGBB_API_KEY_GOES_HERE'`.
    * **Event Listener:** Add a `submit` event listener to `#create-post-form`. This listener should be an `async` function.
    * **Inside the listener:**
        1.  Call `e.preventDefault()`.
        2.  Get the `file` from `#post-image` and `caption` from `#post-caption`.
        3.  Get the `currentUser` from `auth.currentUser`. If no user, return.
        4.  `await` the `uploadImage(file)` to get the `imageUrl`.
        5.  Create a `postData` object:
            * `userId: currentUser.uid`
            * `caption: caption`
            * `imageUrl: imageUrl`
            * `timestamp: serverTimestamp()`
        6.  Create a new post reference: `const newPostRef = push(ref(database, 'posts'));`
        7.  `await set(newPostRef, postData);`
        8.  Alert "Post created!" and reset the form.

3.  **JavaScript (Create `feed.js`):**
    * Create a new file `feed.js`.
    * Import `database` from `./firebase-config.js`.
    * Import `ref`, `onValue`, `query`, `orderByChild`, `get` from `firebase/database`.
    * **Helper Function:** Create an `async function getUserData(userId)` that uses `get(ref(database, 'users/' + userId))` to fetch and return the user's `username` and `profileImageUrl`.
    * **Main Feed Logic:**
        1.  Create a `const feedContainer = document.getElementById('feed-container');`
        2.  Create a reference to all posts, ordered by timestamp: `const postsRef = query(ref(database, 'posts'), orderByChild('timestamp'));`
        3.  Attach a real-time listener: `onValue(postsRef, async (snapshot) => { ... });`
        4.  **Inside the `onValue` callback:**
            * Set `feedContainer.innerHTML = '<h2>Main Feed</h2>';`
            * Create an empty array `posts` to hold post data.
            * Use `snapshot.forEach((childSnapshot) => { posts.push(childSnapshot.val()); });`
            * Reverse the array to show newest first: `posts.reverse();`
            * Loop through the reversed `posts` array. For each `postData`:
                * `await` the `getUserData(postData.userId)` to get `userData`.
                * Create the HTML for the post card.
                * Prepend this HTML to the `feedContainer`.
            * **Post Card HTML Structure:**
                * `<div class="post-card">`
                * `<div class="post-header">`
                * `<img src="${userData.profileImageUrl}" class="post-profile-pic">`
                * `<span class="post-username">${userData.username}</span>`
                * `</div>`
                * `<img src="${postData.imageUrl}" class="post-image">`
                * `<p class="post-caption">${postData.caption}</p>`
                * `</div>`

4.  **CSS (Update `style.css`):**
    * Add styling for the "round frame" on the profile picture.
        * `.post-profile-pic { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-right: 10px; }`
    * Add styling for the post card.
        * `.post-card { border: 1px solid #ccc; border-radius: 8px; margin: 20px auto; max-width: 500px; }`
        * `.post-header { display: flex; align-items: center; padding: 10px; }`
        * `.post-image { width: 100%; height: auto; }`
        * `.post-caption { padding: 0 10px 10px 10px; }`

5.  **HTML (Update `index.html`):**
    * Link the two new script files as modules (after `firebase-config.js`).
        * `<script type="module" src="upload.js"></script>`
        * `<script type="module" src="feed.js"></script>`

## Prompt 5

Do a final polish of the entire `style.css` file.
1.  Set a clean, modern font (like 'Inter' or 'Lato') for the entire body.
2.  Ensure all buttons (`button`, `input[type="submit"]`) have a consistent style (e.g., same color, padding, border-radius, and a `cursor: pointer`).
3.  Make sure the main containers (`#auth-container`, `#feed-container`, `#upload-container`, `#profile-container`) have a consistent `max-width` and `margin: auto` so they are centered.
4.  Clean up any redundant or unused CSS.
