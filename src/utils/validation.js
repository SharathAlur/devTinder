const validator = require('validator')

const validateSignup = (req) => {
    const {firstName, lastName, email, password} = req.body;
    console.log({firstName, lastName, email, password}, !firstName, !lastName)
    if (!firstName || !lastName) {
        console.log(!firstName || !lastName)
        throw new Error("Invalid name");
    }
    if (!email || !validator.isEmail(email)) {
        throw new Error("Enter valid email id")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please use strong password")
    }
}

module.exports = {
    validateSignup
}