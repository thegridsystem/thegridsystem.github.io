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

//Sign-in Function
function signin(){
	var email = document.getElementById("InputEmail1").value;
	var password = document.getElementById("InputPassword1").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	 // Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
    console.log(errorCode + errorMessage);
	//TO-COME: ERROR BOX SHOWING POTENTIAL LOG-IN ERRORS
});
}
function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
var provider = new firebase.auth.GoogleAuthProvider();
function googleSignin(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
		var user_provider = "google";
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var userId = result.user.uid;
		var user = result.user;
		
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
function logOut(){
    	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
		window.location.reload();
	}, function(error) {
		console.error('Sign Out Error', error);
	});
}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
	window.location = "https://thegridsystem.github.io/?";
    console.log(user.uid);
	var userId = user.uid;
    var username = user.displayName;
	console.log(user);
    document.getElementById("displayUsername").innerHTML = username;
  }
});

}
function managePage(){
    if (user) {
        window.location = "https://thegridsystem.github.io/dashboard.html";
    } else {
        window.location = "https://thegridsystem.github.io/login.html";
}
}