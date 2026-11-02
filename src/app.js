const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

app.use('/admin', adminAuth)

app.get('/admin/getalldata', (req,res) => {
    console.log('all data sent after auth')
})

app.listen(7777, () => {
    console.log('server is listening')
});