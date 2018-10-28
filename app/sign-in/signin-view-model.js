const fromObject = require("data/observable").fromObject;
const ObservableArray = require("data/observable-array").ObservableArray;
const finalize = require("rxjs/operators").finalize;

const carService = require("../cars/shared/car-service");

function listViewModel() {
    const viewModel = fromObject({
        cars: new ObservableArray([]),
        isLoading: false,

        _carService: carService.getInstance(),
        _subscription: null,

        load: function () {
            if (!this._subscription) {
                this.set("isLoading", true);

                this._subscription = this._carService.load()
                    .pipe(finalize(() => this.set("isLoading", false)))
                    .subscribe((cars) => {
                        this.set("cars", new ObservableArray(cars));
                        this.set("isLoading", false);
                    });
            }
        },

        unload: function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
                this._subscription = null;
            }
        }
    });

    return viewModel;

}

module.exports = listViewModel;
