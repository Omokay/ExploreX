const express = require('express');
const { httpGetPlanets} = require('../planets/planets.controller');


const planetRouter = express.Router();


planetRouter.get('/planets', httpGetPlanets);


module.exports = planetRouter;