export const validatePassword = (password) => {
    if (password.length < 6) {
        return "Password needs to be at least 6 characters long";
    }

    return "";
};

export const checkPasswords = (password1, password2) => {
    if (password1 !== password2) {
        return "Passwords do not match";
    }

    return "";
};

export const validateEmail = (email) => {
    if (!email.match(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)) {
        return "Not a valid Email";
    }

    return "";
};