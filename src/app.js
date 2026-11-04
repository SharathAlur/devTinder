const express = require("express");
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignup } = require('./utils/validation')
const bcrypt = require('bcrypt')

const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
    const { password, firstName, lastName, gender, email, age} = req.body

    try {
        validateSignup(req);
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName, 
            lastName,
            gender,
            email,
            age,
            password: passwordHash
        })
        await user.save()
        res.send('user added succesfully')
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        console.log(password, user)
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (isValidPassword) {
            res.send('Login successful')
        } else {
            throw new Error("Invalid Credentials")
        }

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

app.patch('/user/:id', async (req, res) => {
    const data = req.body;
    const { id} = req.params
    const ALLOWED_UPDATE = ['password', 'skills', 'gender']
    try {
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATE.includes(k))
        if (!isUpdateAllowed) {
            throw new Error('Update is not allowed')
        }
        const encryptedPass = data.password ? await bcrypt.hash(data.password, 10) : undefined
        await User.findByIdAndUpdate(id, {...req.body, password: encryptedPass}, {
            runValidators: true
        })
        res.send('Updated successfully')
    } catch (err) {
        res.status(500).send('Error: ' + err.message)
    }
})

connectDB().then(() => {
    console.log('conected to DB');
    app.listen(7777, () => {
       console.log('server is listening')
    });
}).catch(err => console.log('error...'))

