const path = require('path'); 
const express = require('express');
const morgan = require('morgan');

const app = express();
const cors = require('cors');

const planetRouter = require('./routes/planets/planets.routes');
const launchRouter = require('./routes/launches/launches.routes');

//Middleware to parse json data 
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());



app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetRouter);
app.use('/launches', launchRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})




module.exports = app;