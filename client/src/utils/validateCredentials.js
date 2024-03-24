const validateCredentials = (email, password) => {
    var emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const isEmailValid = emailRegex.test(email);

    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isPasswordValid = passwordRegex.test(password);

    return [isEmailValid, isPasswordValid]
}

export default validateCredentials;