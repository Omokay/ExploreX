const launches = new Map();
let latestFlightNumber = 100;
 
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Exploration IS1', 
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ztm', 'nasa'],
    upcoming: true,
    success: true,
}


launches.set(launch.flightNumber, launch);
launches.get(100);

/**
 * 
 * @returns All Launches in the launch Map
 */
function  getModelLaunches() {
    return Array.from(launches.values());
}

function doesLaunchExists(launchId) {
    return launches.has(launchId);
}

/**
 * 
 * @param {*} launch 
 * @returns launch object 
 */
function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        upcoming: true,
        success: true,
        customer: ['ZTM', 'NASA'], 
        flightNumber: latestFlightNumber,
    }));
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    
    aborted.upcoming = false;
    aborted.success = false;
    
    return aborted;
}

module.exports = {
    getModelLaunches,
    addNewLaunch,
    doesLaunchExists,
    abortLaunchById,
}