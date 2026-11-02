const express = require("express")

const app = express();

// next will say, go to next matching handler. 
app.get('/user', (req, res, next) => {
    console.log('handler1');
    next()
}, (req, res, next) => {
    console.log('Handler 2');
    res.send('second handler responded')
})

// if res.send is not there, the req will hang.
app.get('/user', (req, res, next) => {
    console.log('handler1');
    next()
}, (req, res, next) => {
    console.log('Handler 2');
})

// if next is there, and there are no more handler, it will throw, route not found.
app.get('/user', (req, res, next) => {
    console.log('handler1');
    next()
}, (req, res, next) => {
    console.log('Handler 2');
    next()
})

// handlers can be writtern  in combination with array
app.get('/user', (req, res, next) => {
    console.log('handler1');
    next()
}, [(req, res, next) => {
    console.log('Handler 2');
    next()
}, (req, res, next) => {
    console.log('Handler 2');
    next()
}, (req, res, next) => {
    console.log('Handler 2');
    next()
}], (req, res, next) => {
    console.log('Handler 2');
    res.send('final output')
})

app.listen(7777, () => {
    console.log('server is listening')
});