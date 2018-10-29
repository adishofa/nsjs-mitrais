const frameModule = require("ui/frame");
const init = require("nativescript-plugin-firebase").init;
const config = require("./config");

// start-up wiring firebase
init({
    persist: false,
    storageBucket: config.firebaseBucket,

    // listener auth state change
    onAuthStateChanged: function(data) {
        console.log(data.loggedIn ? "Signed in firebase" : "Not Yet Sign");
        if (data.loggedIn) {
            frameModule.getFrameById("topmost").navigate({
                moduleName: "cars/list-page",
                clearHistory: true
            });
        }
    }
}).then(() => console.log("firebase.init done"),
    (error) => console.log(`firebase.init error: ${error}`));
