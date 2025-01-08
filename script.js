// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANtywS8RETGn1qmqiHxLvq8OloYLkrX4s",
    authDomain: "testing-b8489.firebaseapp.com",
    projectId: "testing-b8489",
    storageBucket: "testing-b8489.firebasestorage.app",
    messagingSenderId: "687009485730",
    appId: "1:687009485730:web:56affb805a35c1b83c58fb",
    measurementId: "G-1ZJBQW3D26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Recaptcha
function setupRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', // This should match the div ID in your HTML
        {
            size: 'invisible', // Invisible or normal
            callback: (response) => {
                console.log("Recaptcha verified");
            }
        },
        auth
    );
    window.recaptchaVerifier.render().then((widgetId) => {
        console.log("Recaptcha Widget ID:", widgetId);
    });
}

// Send OTP
document.getElementById('send-otp').addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;

    if (!phoneNumber) {
        alert("Please enter a valid phone number.");
        return;
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. " + error.message);
        });
});

// Verify OTP
document.getElementById('verify-otp').addEventListener('click', () => {
    const otp = document.getElementById('otp').value;

    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    window.confirmationResult.confirm(otp)
        .then((result) => {
            const user = result.user;
            alert("Phone number verified successfully!");
            console.log("User Info:", user);
        })
        .catch((error) => {
            console.error("Error verifying OTP:", error);
            alert("Failed to verify OTP. " + error.message);
        });
});

// Initialize Recaptcha when the page loads
setupRecaptcha();
