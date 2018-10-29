const signinViewModel = require("./signin-view-model");
const frameModule = require("ui/frame");

const loginViewModel = new signinViewModel();

function pageLoaded(args) {
    const page = args.object;
    page.bindingContext = loginViewModel;
}

exports.pageLoaded = pageLoaded;
