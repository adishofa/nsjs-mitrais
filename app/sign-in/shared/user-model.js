function User(options) {
    const model = {
        email: options.email,
        password: options.password,
        confirmPassword: options.confirmPassword && options.confirmPassword === options.password
    };

    return model;
}

module.exports = User;
