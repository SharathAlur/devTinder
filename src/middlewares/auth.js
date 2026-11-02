// Authenticate, then only execute the next handles, else return unauthorised
const adminAuth = (req, res, next) => {
    if (req.body.token !== 'valid admin') {
        res.status(401).send('no access')
    }
    next();
}
// Authenticate user, then only execute the next handles, else return unauthorised
const userAuth = (req, res, next) => {
    if (req.body.token !== 'valid user') {
        res.status(401).send('no access')
    }
    next();
}

module.exports = {
    adminAuth,
    userAuth
}