/* global firebase */
/* global Firebase */
var patId;
var patUserEmail;
var patSequelizeId;

var docId;
var docUserEmail;
var docSequelizeId;

$(function() {
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
            $("#docFormId").attr("value", docId);
            $("#docFormEmail").attr("value", docUserEmail);
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
            $("#patFormId").attr("value", patId);
            $("#patFormEmail").attr("value", patUserEmail);

            // createDoctorSelect();


        }
        else {
            // User is signed out.
            console.log("No User present.");
        }
    });

    // $("#signOut").on("click", function() {
    //     firebase.auth().signOut().then(function() {
    //         console.log('Signed Out');
    //     }, function(error) {
    //         console.error('Sign Out Error', error);
    //     });

    //     // $("#hideSignOut").hide();
    //     // $("#hideSignIn").show();
    // });
});
