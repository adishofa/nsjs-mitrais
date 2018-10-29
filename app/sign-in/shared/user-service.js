const catchError = require("rxjs/operators").catchError;
const Observable = require("rxjs").Observable;
const throwError = require("rxjs").throwError;
const firebase = require("nativescript-plugin-firebase");


function userService() {
    if (userService._instance) {
        throw new Error("Use .getInstance() instead of new");
    }

    this._user = [];
    userService._instance = this;

    this.login = function (user) {
        return firebase.login(
            {
              type: firebase.LoginType.PASSWORD,
              passwordOptions: {
                email: user.email,
                password: user.password
              }
            })
            .then(result => JSON.stringify(result))
            .catch(error => console.log(error));
    }

    this.logout = function () {
        return firebase.logout();
    }

    this._handleErrors = function (error) {
        return throwError(error);
    }
}

userService.getInstance = function () {
    return userService._instance;
}

userService._instance = new userService();

module.exports = userService;
