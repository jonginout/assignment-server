const express = require('express')
const app = express()
const config = require('./config')
const port = config.port
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())


app.use((req, res, next) => {
    var allowedOrigins = ['http://web.jongin.site', 'http://localhost:8080'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', true);
    }
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,x-access-token');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  
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

mongoose.connect(config.mongodbUri, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})


