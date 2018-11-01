const application = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");

const AppRootViewModel = require("./app-root-view-model");

function onLoaded(args) {
    const drawerComponent = args.object;
    drawerComponent.bindingContext = new AppRootViewModel();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;

    bindingContext.set("selectedPage", componentTitle);

    frameModule.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });

    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();
}

function onLogoutTap() {
    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();
    let viewModel = new AppRootViewModel();
    viewModel.logout();
    setTimeout(() => {
        frameModule.topmost().navigate({
            moduleName: "sign-in/signin-page",
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        });
    }, 1000);
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
exports.onLogoutTap = onLogoutTap;
