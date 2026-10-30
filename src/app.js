const express = require("express")

const app = express();
// /abc /ac
app.get('/ab?c', (req, res) => {res.send('success')})
// /abc, /abbbbbc
app.get('/ab+c', (req, res) => {res.send('success')})
// /abc, /ablasjdkflsdc
app.get('/ab*c', (req, res) => {res.send('success')})
// any route ends with c
app.get('/.*c$', (req, res) => {res.send('success')})

app.get('/user/:userId', (req, res) => {
    console.log(req.query);
    console.log(req.params)
    res.send('success')
})

app.listen(7777, () => {
    console.log('server is listening')
});