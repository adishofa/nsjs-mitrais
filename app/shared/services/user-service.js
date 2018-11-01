const throwError = require("rxjs").throwError;
const firebase = require("nativescript-plugin-firebase");


function userService() {
    if (userService._instance) {
        throw new Error("Use .getInstance() instead of new");
    }

    userService._instance = this;

    this.login = function (user) {
        return new Promise((resolve, reject) => {
            this.logout()
                .then(() => {
                    // firebase.login({
                    //     type: firebase.LoginType.PASSWORD,
                    //     passwordOptions: {
                    //         email: user.email,
                    //         password: user.password
                    //     }
                    // })
                    // .then(resolve)
                    // .catch((err) => {
                    //     this._handleErrors(err);
                    //     reject();
                    // });

                    firebase.login({
                        type: firebase.LoginType.PHONE,
                        phoneOptions: {
                            phoneNumber: user.email,
                            verificationPrompt: "Verification Code" 
                        }
                    })
                    .then(resolve)
                    .then((result) => {
                        console.log(result);
                    })
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

    this.getCurrentUser = function () {
        return firebase.getCurrentUser()
            .then((result) => console.dir(result))
            .catch((err) => console.log(err));
    }

    this.updateProfile = function () {
        return firebase.updateProfile({
                displayName: 'Adi Hafiduh',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/nativescriptjs.appspot.com/o/cars%2FMini%20Cooper%20s.jpg?alt=media&token=9d042865-c6f6-4128-85d7-13f46cb5c6b3'
            })
            .then(() => {
                // called when update profile was successful
                console.log("Profile Updated");
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
            });
    }

    this._handleErrors = function (error) {
        console.log(error);
    }
}

userService.getInstance = function () {
    return userService._instance;
}

userService._instance = new userService();

module.exports = userService;
