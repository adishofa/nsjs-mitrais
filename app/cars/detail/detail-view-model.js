const fromObject = require("data/observable").fromObject;

function detailViewModel(carModel) {
    const viewModel = fromObject({
        car: carModel
    });

    return viewModel;
}

module.exports = detailViewModel;
