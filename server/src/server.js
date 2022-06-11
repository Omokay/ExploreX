const http = require('http');
const app = require('./app');

const {loadPlanets} = require('./models/planets.model');

const PORT = process.env.PORT || 9000;
const server = http.createServer(app);

// Because of limitations from using commonJS, we cannot use await outside an async function

async function startServer() {
    await loadPlanets();
    server.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
}

startServer();




