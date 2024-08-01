
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
