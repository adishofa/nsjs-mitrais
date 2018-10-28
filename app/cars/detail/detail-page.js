const topmost = require("tns-core-modules/ui/frame").topmost;
const detailViewModel = require("./detail-view-model");

function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new detailViewModel(page.navigationContext);
}

function onBackButtonTap() {
    topmost().goBack();
}

function onEditButtonTap(args) {
    const bindingContext = args.object.bindingContext;

    topmost().navigate({
        moduleName: "cars/edit/edit-page",
        context: bindingContext,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onEditButtonTap = onEditButtonTap;
