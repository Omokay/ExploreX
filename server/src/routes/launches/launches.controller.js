const {getModelLaunches, addNewLaunch, doesLaunchExists, abortLaunchById} = require('../../models/launch.model');


function httpGetLaunches(req, res) {
    return res.status(200).json(getModelLaunches());
}

function httpPostLaunch(req, res) {
    let launch = req.body;
    console.log(req.body);

    let {launchDate, mission, rocket, target } = launch;

    if (!launchDate.length || !mission.length || !rocket.length || !target.length) {
        return res.status(400).json({
            error: 'Missing some required launch properties',
        })
    }

    launchDate = new Date(launchDate);
    if (launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({
            error: 'Invalid Launch Date',
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}


function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    
    if (!doesLaunchExists(launchId)) {
        return res.status(404).json({
            error: 'Launch does not exist',
        });
    }

    const {upcoming} = req.body;
    if (doesLaunchExists(launchId) && upcoming === false) {
        res.status(400).json({
            error: 'Launch has already been aborted',
        })
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}


module.exports = {
    httpGetLaunches,
    httpPostLaunch,
    httpAbortLaunch,
}