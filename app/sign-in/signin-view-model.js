const fromObject = require("data/observable").fromObject;
const dialogModule = require("ui/dialogs");
const userService = require("~/shared/services/user-service");
const topmost = require("ui/frame").topmost;

function signinViewModel() {
    const viewModel = fromObject({
        email: "",
        password: "",
        confirmPassword: "",
        isLoggingIn: true,
        _userService: userService.getInstance(),
        toggleForm: function () {
            this.isLoggingIn = !this.isLoggingIn;
        },

        submit: function () {
            if (this.email.trim() === "" || this.password.trim() === "") {
                alert("please provide both an email address and password.");
                return;
            }

            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },

        login: function () {
            this._userService.login({
                email: this.email,
                password: this.password
            }).then(() => {
                topmost().navigate("cars/list-page");
            })
            .catch((err) => {
                alert("Unfortunately we could not find your account." + err);
            });
        },

        register: function () {
            // if (this.password != this.confirmPassword) {
            //     alert("Your passwords do not match.");
            //     return;
            // }
            // userService.register({
            //     email: this.email,
            //     password: this.password
            // }).then(() => {
                alert("Your account was successfully created. you can now login.");
                this.isLoggingIn = true;
            // })
            // .catch(() => {
            //     alert("Unfortunately we were unable to create your account.");
            // });
        },

        forgotPassword: function () {
            dialogModule.prompt({
                title: "Forgot Password",
                message: "Enter the email address you used to register for APP NAME to reset your password.",
                inputType: "email",
                defaultText: "",
                okButoonText: "Ok",
                cancelButtonText: "Cancel"
            })
            .then((data) => {
                if (data.result) {
                    this._userService.resetPassword(data.text.trim())
                        .then(() => {
                            alert("Your password was successfully reset. Please check your email address.");
                        })
                        .catch(() => {
                            alert("Unfortunately, an error occured resetting your password.");
                        })
                }
            });
        }
    });

    return viewModel;
}

module.exports = signinViewModel;
