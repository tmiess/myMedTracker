/* global firebase */
/* global Firebase */
var patId;
var patUserEmail;
var patSequelizeId;

// Initialize Firebase
var patConfig = {
    apiKey: "AIzaSyA_O9wyyn23uCxJs2MT8UgG3S3yEs4JSmU",
    authDomain: "patient-login.firebaseapp.com",
    databaseURL: "https://patient-login.firebaseio.com",
    projectId: "patient-login",
    storageBucket: "patient-login.appspot.com",
    messagingSenderId: "8215542957"
};
var patConfig = firebase.initializeApp(patConfig, "patient");

patConfig.auth().onAuthStateChanged(function(user) {

    if (user) {
        // User is signed in.
        patId = user.uid;
        patUserEmail = user.email;
        console.log("Current Logged in User ID: " + patId);
        $.ajax({
            url: "/api/patients/" + user.uid,
            method: "GET"
        }).done(function(pat) {
            console.log(pat);
            patSequelizeId = pat.id;
        });
    }
    else {
        // User is signed out.
        console.log("No User present.");
    }
});
