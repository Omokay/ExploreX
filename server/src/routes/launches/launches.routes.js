const express = require('express');


const { httpGetLaunches, httpPostLaunch, httpAbortLaunch } = require('./launches.controller');

const launchRouter = express.Router();

launchRouter.get('/', httpGetLaunches);
launchRouter.post('/', httpPostLaunch);
launchRouter.delete('/:id', httpAbortLaunch);

module.exports = launchRouter;