const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use('/admin', adminAuth)

app.get('/admin/getalldata', (req,res) => {
    console.log('all data sent after auth')
})

app.get('/user', userAuth, (req, res) => {
    throw new Error('Some error')
})

app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send('something went wrong')
    }
})

app.listen(7777, () => {
    console.log('server is listening')
});