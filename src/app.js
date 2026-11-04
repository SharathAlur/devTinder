const express = require("express");
const connectDB = require('./config/database')
const User = require('./models/user')

const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        res.send('user added succesfully')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
})

app.get('/user', async (req, res) => {
    console.log(req.body.email)
    try {
       const users = await User.find({email: req.body.email})
       if (users.length === 0) {
        res.send("No users")
       }
       res.send(users)

    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send('deleted successfully')
    } catch (err) {
        res.status(500).send('something went wrong')
    }
})

app.patch('/user', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, req.body, {
            runValidators: true
        })
        res.send('Updated successfully')
    } catch (err) {
        res.status(500).send('something went wrong')
    }
})

connectDB().then(() => {
    console.log('conected to DB');
    app.listen(7777, () => {
       console.log('server is listening')
    });
}).catch(err => console.log('error...'))

