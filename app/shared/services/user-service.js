const catchError = require("rxjs/operators").catchError;
const Observable = require("rxjs").Observable;
const throwError = require("rxjs").throwError;
const firebase = require("nativescript-plugin-firebase/app");


function userService() {
    if (userService._instance) {
        throw new Error("Use .getInstance() instead of new");
    }

    userService._instance = this;

    this.login = function (user) {
        return new Promise((resolve, reject) => {
            this.logout()
                .then(() => {
                    firebase.login({
                        type: firebase.LoginType.PASSWORD,
                        passwordOptions: {
                            email: user.email,
                            password: user.password
                        }
                    })
                    .then(resolve)
                    .catch((err) => {
                        this._handleErrors(err);
                        reject();
                    });
                })
                .catch((err) => {
                    this._handleErrors(err);
                    reject();
                });
        });
    }

    this.logout = function () {
        return firebase.logout();
    }

    this.resetPassword = function (email) {
        return firebase.resetPassword({
            email: email
          }).then(
              function () {
                // called when password reset was successful,
                // you could now prompt the user to check his email
              },
              function (errorMessage) {
                console.log(errorMessage);
              }
          );
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
