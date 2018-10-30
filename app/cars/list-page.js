const listViewModel = require("./list-view-model");
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
    const page = args.object;
    const tapViewModel = page.bindingContext;
    const tappedItem = tapViewModel._map.cars._array[args.index]; 

    // console.log(tappedItem); // check correct access object's property
    
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

function onLogoutTap() {
    let viewModel = new listViewModel();
    viewModel.logout();
    setTimeout( function () {
        topmost().navigate({
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

function onFabTap() {
    topmost().navigate({
        moduleName: "cars/add/adding-page",
        animated: true,
        transition: {
            name: "slideTop",
            duration: 100,
            curve: "easeOut"
        }
    })
}

exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onItemTap = onItemTap;
exports.onLogoutTap = onLogoutTap;
exports.onFabTap = onFabTap;
