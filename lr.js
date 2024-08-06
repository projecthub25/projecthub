// //form 1
// function Tamil() {
//   var uname = document.forms["form"]["uname"].value;
//   var upswd = document.forms["form"]["upswd"].value;

//   if (uname == null || uname == "") {
//       document.getElementById("errorBox").innerHTML = "enter the user name";
//       return false;
//   }

//   if (upswd == null || upswd == "") {
//       document.getElementById("errorBox").innerHTML = "enter the password";
//       return false;
//   }

//   if (uname != '' && upswd != '') {
//       alert("Login successfully");
//   }
// }

// //form 2
// function Tamil1() {
//   var uname1 = document.forms["form1"]["uname1"].value;
//   var email1 = document.forms["form1"]["email1"].value;
//   var upswd1 = document.forms["form1"]["upswd1"].value;
//   var upswd2 = document.forms["form1"]["upswd2"].value;

//   if (uname1 == null || uname1 == "") {
//       document.getElementById("errorBox").innerHTML = "enter the user name";
//       return false;
//   }

//   if (email1 == null || email1 == "") {
//       document.getElementById("errorBox").innerHTML = "enter the email";
//       return false;
//   }

//   if (upswd1 == null || upswd1 == "") {
//       document.getElementById("errorBox").innerHTML = "enter the password";
//       return false;
//   }

//   if (upswd2 == null || upswd2 == "") {
//       document.getElementById("errorBox").innerHTML = "enter the password";
//       return false;
//   }

//   if (upswd1 != upswd2) {
//       document.getElementById("errorBox").innerHTML = "password don't match";
//       return false;
//   }

//   if (uname1 != '' && upswd1 != '' && upswd2 != '' && email1 != '' && upswd1 == upswd2) {
//       alert("Register successful");
//   }
// }
import { database, ref, set, get, child } from './firebase.js';

// Helper function to convert an ArrayBuffer to a hex string
const bufferToHex = (buffer) => {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

// Function to hash a password
const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
};

// Function to handle user registration
const handleRegister = async () => {
    const username = document.getElementById('uname1').value;
    const email = document.getElementById('email1').value;
    const password = document.getElementById('upswd1').value;
    const confirmPassword = document.getElementById('upswd2').value;
    const errorBox = document.getElementById('errorBox');

    if (password !== confirmPassword) {
        errorBox.innerText = "Passwords do not match!";
        errorBox.style.display = "block";
        return;
    }

    try {
        const hashedPassword = await hashPassword(password);
        await set(ref(database, 'users/' + username), {
            email: email,
            password: hashedPassword
        });
        window.location.href = 'login.html'; // Redirect to login page after registration
    } catch (error) {
        console.error("Error registering user: ", error);
        errorBox.innerText = "Error registering user!";
        errorBox.style.display = "block";
    }
};

// Function to handle user login
const handleLogin = async () => {
    const username = document.getElementById('uname').value;
    const password = document.getElementById('upswd').value;
    const errorBox = document.getElementById('errorBox');

    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${username}`));

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const hashedPassword = await hashPassword(password);

            if (hashedPassword === userData.password) {
                window.location.href = 'index.html'; // Redirect to index page after login
            } else {
                errorBox.innerText = "Incorrect password!";
                errorBox.style.display = "block";
            }
        } else {
            errorBox.innerText = "User does not exist!";
            errorBox.style.display = "block";
        }
    } catch (error) {
        console.error("Error logging in: ", error);
        errorBox.innerText = "Error logging in!";
        errorBox.style.display = "block";
    }
};

// Function to load navigation
const loadNav = () => {
    fetch('head.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const navContainer = document.getElementById('navbar-container');
            if (navContainer && !navContainer.innerHTML.trim()) {
                navContainer.innerHTML = data;

                // Add event listeners after loading the navigation
                const signupButton = document.getElementById('submitsignup');
                const loginButton = document.getElementById('submitlogin');

                if (signupButton) {
                    signupButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleRegister();
                    });
                }

                if (loginButton) {
                    loginButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleLogin();
                    });
                }
            }
        })
        .catch(error => console.error('Error loading head.html:', error));
};

// Load the navigation bar when the page loads
window.addEventListener('DOMContentLoaded', loadNav);
