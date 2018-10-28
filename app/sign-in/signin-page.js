const listViewModel = require("./signin-view-model");
const topmost = require("tns-core-modules/ui/frame").topmost;

function onNavigatingTo(args) {
    const page = args.object;

    let viewModel = page.bindingContext;
    if (!args.isBackNavigation) {
        viewModel = new listViewModel();
        page.bindingContext = viewModel;
    }

    viewModel.load();
}

function onNavigatingFrom(args) {
    const page = args.object;
    const oldViewModel = page.bindingContext;
    if (oldViewModel) {
        oldViewModel.unload();
    }
}

function onItemTap(args) {
    const tappedItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: "cars/detail/detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onItemTap = onItemTap;
