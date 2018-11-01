const signinViewModel = require("./signin-view-model");
const frameModule = require("ui/frame");
const app = require("tns-core-modules/application")

const loginViewModel = new signinViewModel();

function pageLoaded(args) {
    const page = args.object;
    page.bindingContext = loginViewModel;

    const drawerComponent = app.getRootView();
    drawerComponent.closeDrawer();
}

exports.pageLoaded = pageLoaded;
