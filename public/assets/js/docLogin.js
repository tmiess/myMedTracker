/* global firebase */
/* global Firebase */
console.log("loaded");
var docSequelizeId;

$(function() {
  $('.modal').modal();

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

  var docId;
  var email;
  var password;
  var userEmail;

  // Doc Register Setup
  $("#docRegister").click(function docSignUp() {

    email = $("#newDocEmail").val().trim();
    // console.log(email);

    password = $("#newDocPassword").val().trim();
    // console.log(password);

    if (email.length < 2) {
      alert('Please enter an email address.');
      return false;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return false;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    docConfig.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
        return $("#docForm").leanModal();
      }
      else {
        alert(errorMessage);
      }
      console.log(error);


      // [END_EXCLUDE]
    }).then(function() {
      // initAuth();
    });

  });



  // function initAuth() {
  // Listening for auth state changes.
  // [START authstatelistener]
  docConfig.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in.
      docId = user.uid;
      userEmail = user.email;
      // getLocation();
      console.log("Current Logged in User ID: " + docId);
      $("#docFormId").attr("value", docId);
      $("#docFormEmail").attr("value", userEmail);
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
  // }


  $("#docFormSubmit").click(function docTablePush() {

    var docFullName = $("#docFullName").val().trim();

    email = $("#docFormEmail").val().trim();

    var docFormId = $("#docFormId").val().trim();

    function getDocInfo() {
      $.ajax({
        method: "POST",
        url: "/doctor",
        data: {
          full_name: docFullName,
          doc_email: email,
          doc_uid: docFormId
        }
      }).done(function(data) {
        console.log("Doctor UID = " + docFormId);

      });
    }
    getDocInfo();

  });
  //Doc Login Setup
  $("#docLogin").click(function docLogin() {
    var docEmailLogin = $("#docEmail").val().trim();

    var docPasswordLogin = $("#docPassword").val().trim();

    if (docEmailLogin.length < 2) {
      alert('Please enter an email address.');
      return false;
    }
    if (docPasswordLogin.length < 4) {
      alert('Please enter a password.');
      return false;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    docConfig.auth().signInWithEmailAndPassword(docEmailLogin, docPasswordLogin).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        $("#docLoginModal").leanModal();
        return;
      }
      else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });




});
