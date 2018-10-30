if (global.TNS_WEBPACK) {
    // Register ui-listview module
    global.registerModule("nativescript-ui-listview", () =>
        require("../node_modules/nativescript-ui-listview"));
    
    // Register sidedrawer module
    global.registerModule("nativescript-ui-sidedrawer", () =>
        require("../node_modules/nativescript-ui-sidedrawer"));
}
