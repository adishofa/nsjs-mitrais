const init = require("nativescript-plugin-firebase").init;
const config = require("./config");

// start-up wiring firebase
init({
    persist: false,
    storageBucket: config.firebaseBucket,
    onAuthStateChanged: function(data) {
        console.log(data.loggedIn ? "Signed in firebase" : "Not Yet Sign");
        if (data.loggedIn) {
            console.log("usermail : " + (data.user.email ? data.user.email : "N/A"));
        }
    }
}).then(() => console.log("firebase.init done"),
    (error) => console.log(`firebase.init error: ${error}`));
