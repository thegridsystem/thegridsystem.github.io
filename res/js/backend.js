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
    document.getElementById("profilePic").src= photoUrl;
    document.getElementById("displayUsername").innerHTML = username + "	&#x25BC;";
    document.getElementById("userEmail").innerHTML = useremail;
    document.getElementById("displayUsername2").innerHTML = username;
    
	});
  }else{
      window.location("https://gridsystem.azurewebsites.net/login.html")
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

function goback(){
    window.location = "https://gridsystem.azurewebsites.net/";
}
var user = firebase.auth().currentUser;
if (user) {
  // User is signed in.
} else {
  window.location = "https://gridsystem.azurewebsites.net/login.html";
}