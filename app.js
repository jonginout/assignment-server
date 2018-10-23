const express = require('express')
const app = express()
const config = require('./config')
const port = config.port
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

app.use('/', require('./routes/api'))

app.use((err, req, res, next) => {
    if(err) res.status(err.status || 500);
    res.json({
      success : false,
      message: err.message,
      error: err
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})