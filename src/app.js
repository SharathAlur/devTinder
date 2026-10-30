const express = require("express")

const app = express();

app.get('/user', (req, res) => {
    res.send({name: "sharath", age: "35", address: "Bengaluru"})
})
app.post('/user', (req, res) => {
    res.send("Saved successfully")
})
app.patch('/user', (req, res) => {
    res.send("User updated")
})
app.delete('/user', (req, res) => {
    res.send("user deleted")
})

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