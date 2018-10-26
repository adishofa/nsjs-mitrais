const init = require("nativescript-plugin-firebase").init;
const config = require("./config");

// start-up wiring firebase
init({
    persist: false,
    storageBucket: config.firebaseBucket
}).then(() => console.log("firebase.init done"),
    (error) => console.log(`firebase.init error: ${error}`));
