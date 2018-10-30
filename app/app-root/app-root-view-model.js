const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");
const userService = require("~/shared/services/user-service");

function AppRootViewModel() {
    const viewModel = observableModule.fromObject({
        selectedPage: "",
        _userService: userService.getInstance(),

        logout: function () {
            let actionLogout = Promise.resolve();

            this.set("isLoading", true);

            return actionLogout
                .then(() => this._userService.logout())
                .then(() => this.set("isLoading", false))
                .catch((err) => {
                    this.set("isLoading", false);
                    throw err;
                })
        }
    });

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });

    return viewModel;
}

module.exports = AppRootViewModel;
