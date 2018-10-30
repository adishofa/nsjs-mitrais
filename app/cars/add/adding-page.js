const topmost = require("ui/frame").topmost;
const alert = require("ui/dialogs").alert;

const addViewModel = require("./adding-view-model");
const viewModel = new addViewModel()

function pageLoaded(args) {
    const page = args.object;
    page.bindingContext = viewModel;
}

function onCancelButtonTap(args) {
    topmost().goBack();
}

function onDoneButtonTap(args) {
    const actionItem = args.object;
    const bindingContext = actionItem.bindingContext;

    bindingContext.saveAdding()
        .then(() => topmost().navigate({
            moduleName: "cars/list-page",
            animated: true,
            clearHistory: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }))
        .catch((err) => alert({
            title: "Sorry, ",
            message: err,
            okButtonText: "Ok"
        }));
}

function onSelectorTap(args) {
    const gridLayout = args.object;
    const tag = gridLayout.tag;
    const bindingContext = gridLayout.bindingContext;
    const selectedValue = bindingContext.car[tag];
    const context = {
        tag,
        selectedValue
    };
    const modalPagePath = "cars/modal/selector/list-selector";
    const page = gridLayout.page;

    page.showModal(modalPagePath, context, (value) => {
        if (value) {
            bindingContext.car.set(tag, value);
        }
    }, false);
}

function onImageAddRemoveTap(args) {
    const gridLayout = args.object;
    const bindingContext = gridLayout.bindingContext;

    bindingContext.onImageAddRemove();
}

exports.pageLoaded = pageLoaded;
exports.onCancelButtonTap = onCancelButtonTap;
exports.onDoneButtonTap = onDoneButtonTap;
exports.onSelectorTap = onSelectorTap;
exports.onImageAddRemoveTap = onImageAddRemoveTap;
