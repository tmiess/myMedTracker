/* global firebase */
/* global Firebase */
var docId;
var docUserEmail;
var docSequelizeId;


// Initialize Firebase
var docConfig = {
    apiKey: "AIzaSyDAjzmDGWyJyGxQRtzCkntvgQkyuG-7xeA",
    authDomain: "doctor-login-b6832.firebaseapp.com",
    databaseURL: "https://doctor-login-b6832.firebaseio.com",
    projectId: "doctor-login-b6832",
    storageBucket: "doctor-login-b6832.appspot.com",
    messagingSenderId: "819442752065"
};
var docConfig = firebase.initializeApp(docConfig);

docConfig.auth().onAuthStateChanged(function(user) {

    if (user) {
        // User is signed in.
        docId = user.uid;
        docUserEmail = user.email;
        console.log("Current Logged in User ID: " + docId);
        $.ajax({
            url: "/api/doctors/" + user.uid,
            method: "GET"
        }).done(function(doc) {
            console.log(doc);
            docSequelizeId = doc.id;
        });

    }
    else {
        // User is signed out.
        console.log("No User present.");
    }
});
