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
        window.location = "https://gridsystem.azurewebsites.net/";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + errorMessage);
        //TO-COME: ERROR BOX SHOWING POTENTIAL LOG-IN ERRORS
    });
}
//Sign-Up Function
function signup(){
	var email2 = document.getElementById("signupEmail").value;
	var password2 = document.getElementById("signupPassword").value;
	var username2 = document.getElementById("signupName").value;
	firebase.auth().createUserWithEmailAndPassword(email2, password2).then(function(user){
	console.log(user);
    window.location = "https://gridsystem.azurewebsites.net/";
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
	// ...
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
        window.location = "https://gridsystem.azurewebsites.net/";
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
	console.log(user);
	var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  	var username = snapshot.val().username;
 	// ...
    document.getElementById("displayUsername").innerHTML = username + "	&#x25BC;";
	});
  };
});

function managePage() {
    if (x == 1) {
        window.location = "https://gridsystem.azurewebsites.net/manage.html";
    } else {
        window.location = "https://gridsystem.azurewebsites.net/login.html";
	}
};

window.onresize = function(){ location.reload(); } //refreshes the page on resize
