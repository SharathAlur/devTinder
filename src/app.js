const express = require("express")

const app = express();

app.use('/test', (req, res) => {
    res.send("Hello from servers")
})
app.use('/hello', (req, res) => {
    res.send("Hello hello hello")
})
app.use('/tess', (req, res) => {
    res.send("tesss")
})
app.use((req, res) => {
    res.send("home")
})

app.listen(7777, () => {
    console.log('server is listening')
});