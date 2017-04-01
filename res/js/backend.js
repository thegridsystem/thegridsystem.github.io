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


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
	changeLocation();
    console.log(user.uid);
	var userId = user.uid;
	var user = user.email;
	console.log(user);
    document.getElementById("displayUsername").innerHTML = "Hello";
  }
});

function changeLocation(){
	var currenturl = window.location.href;
	console.log(currenturl);
	if (currenturl != "http://gridsystem.azurewebsites.net/"){
		window.location = "http://gridsystem.azurewebsites.net/";
	};
}