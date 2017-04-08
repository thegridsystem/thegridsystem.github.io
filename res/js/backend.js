x = 0;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqzcIJEDrb8E4yJubktyfyIh2YFZFJL54",
    authDomain: "grid-b7f66.firebaseapp.com",
    databaseURL: "https://grid-b7f66.firebaseio.com",
    projectId: "grid-b7f66",
    storageBucket: "grid-b7f66.appspot.com",
    messagingSenderId: "571229097625"
};
firebase.initializeApp(config);
var database = firebase.database();

//Sign-in Function
function signin() {
    var email = document.getElementById("signinEmail").value;
    var password = document.getElementById("signinPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        goback();
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + errorMessage);
        document.getElementById("errorlogin").style.visibility = "visible";
        document.getElementById("errormessage").innerHTML = "Error " + errorMessage;
    });
}
//Sign-Up Function
function signup(){
	var email2 = document.getElementById("signupEmail").value;
	var password2 = document.getElementById("signupPassword").value;
	var username2 = document.getElementById("signupName").value;
	firebase.auth().createUserWithEmailAndPassword(email2, password2).then(function(user){
	console.log(user);
    goback();
	var userId = user.uid;
	var username2 = document.getElementById("signupName").value;
	firebase.database().ref('users/' + userId).set({
    username: username2,
  	});
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	console.log(errorCode + errorMessage);
    document.getElementById("errorlogin2").style.visibility = "visible";
    document.getElementById("errormessage2").innerHTML = "Error " + errorMessage;
	// ...
});
}
function back(){
    window.location = "https://gridsystem.azurewebsites.net/";
}
function resetpassword(){
    var auth = firebase.auth();
    var emailAddress = document.getElementById("resetEmail").value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
    $('#delModal').modal('hide');
    }, function(error) {
    // An error happened.
    });
}
function deleteaccount(){
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
    goback();
    }, function(error) {
    console.log(error);
    });
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
callback = "";
var solar = 30;
var hydro = 20;
var nuclear = 35;
var pavegen = 10;
var other = 5;
setInterval(function() {  
  return firebase.database().ref('/graph').once('value').then(function(snapshot) {
  	 solar = snapshot.val().solar;
     hydro = snapshot.val().hydro;
     nuclear = snapshot.val().nuclear;
     pavegen = snapshot.val().pavegen;
     other =  snapshot.val().other;
  });
}, 5000);
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user_provider = "google";
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var userId = result.user.uid;
        var user = result.user;
        var username3 = result.user.displayName;
        firebase.database().ref('users/' + userId).set({
        username: username3,
  	    });
        goback();
	    }).catch(function(error) {
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        document.getElementById("errorlogin").style.visibility = "visible";
        document.getElementById("errormessage").innerHTML = "Error " + errorMessage;
    });
}

function logOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.reload();
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    x=1;
    console.log(user.uid);
	var userId = user.uid;
    var useremail = user.email;
	console.log(user);
	var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  	var username = snapshot.val().username;
 	// ...
    photoUrl = user.photoURL;
    console.log(photoUrl);
    document.getElementById("displayUsername").innerHTML = username + "	&#x25BC;";
    document.getElementById("userEmail").innerHTML = useremail;
    document.getElementById("displayUsername2").innerHTML = username;
    document.getElementById("profilePic").src= photoUrl;
    
	});
  }else if (window.location.href == "https://gridsystem.azurewebsites.net/login.html") {
  }
  else if (window.location.href == "http://localhost/login.html") {
  }else if (window.location.href == "https://gridsystem.azurewebsites.net/login") {
  }
  else{
      window.location = "https://gridsystem.azurewebsites.net/login.html";
  }

});

function managePage() {
    if (x == 1) {
        window.location = "https://gridsystem.azurewebsites.net/manage.html";
    } else {
        window.location = "https://gridsystem.azurewebsites.net/login.html";
	}
};


window.onresize = function(){ location.reload(); } //refreshes the page on resize

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
	console.log("On a mobile device.");
} else {
	window.onresize = function(){ location.reload(); } //refreshes the page on resize
}
	
}
function goback(){
    window.location = "https://gridsystem.azurewebsites.net/";
}

//Initialize material animations
$(function() {
    $.material.init();
});