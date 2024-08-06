// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAneEG2HGZmxrvsDNsbxTO4jXZOTmXH8us",
    authDomain: "project-hub-d7bff.firebaseapp.com",
    projectId: "project-hub-d7bff",
    storageBucket: "project-hub-d7bff.appspot.com",
    messagingSenderId: "932775343919",
    appId: "1:932775343919:web:8a0d9467e3011bf216d3da",
    measurementId: "G-998YT3YKGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics;
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Use `firebase/analytics` only on non-localhost
    analytics = getAnalytics(app);
}

const database = getDatabase(app);

export { database, ref, set, get, child };
