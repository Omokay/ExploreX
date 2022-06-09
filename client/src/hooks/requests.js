const base_url_test = 'http://localhost:9000';

async function httpGetPlanets() {
  const response = await fetch(`${base_url_test}/planets`);
  //.json() returns a promise, hence the await 
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${base_url_test}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber -  b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${base_url_test}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  try {
     return await fetch(`${base_url_test}/launches/${id}`, {
       method: "delete",
     });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};