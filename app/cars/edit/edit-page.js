const topmost = require("ui/frame").topmost;
const alert = require("ui/dialogs").alert;

const editViewModel = require("./edit-view-model");

function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new editViewModel(page.navigationContext);
}

function onCancelButtonTap(args) {
    topmost().goBack();
}

function onDoneButtonTap(args) {
    const actionItem = args.object;
    const bindingContext = actionItem.bindingContext;

    bindingContext.saveChanges()
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
            title: "Sorry,",
            message: err.message,
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

exports.onNavigatingTo = onNavigatingTo;
exports.onCancelButtonTap = onCancelButtonTap;
exports.onDoneButtonTap = onDoneButtonTap;
exports.onSelectorTap = onSelectorTap;
exports.onImageAddRemoveTap = onImageAddRemoveTap;
