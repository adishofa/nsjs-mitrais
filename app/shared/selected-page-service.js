const { BehaviorSubject } = require("rxjs");

function SelectedPageService() {
    if (SelectedPageService._instance) {
        throw new Error("Use SelectedPageService.getInstance() instead new.");
    }

    // observable selected source
    this._selectedPageSource = new BehaviorSubject("Home");

    // Observable selectedPage Stream
    this.selectedPage$ = this._selectedPageSource.asObservable();

    this.updateSelectedPage = function (selectedPage) {
        this._selectedPageSource.next(selectedPage);
    }
}

SelectedPageService.getInstance = function () {
    return SelectedPageService._instance;
}

SelectedPageService._instance = new SelectedPageService();

module.exports = SelectedPageService;
