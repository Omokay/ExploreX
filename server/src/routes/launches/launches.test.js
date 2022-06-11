const request = require('supertest');
const app = require('../../app');


describe('GET /LAUNCHES', () => {
    test('It should return response 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        /** expect(response).toBe(200); <without supertest assertions>*/
    });
});


describe('POST /LAUNCH', () => {
    const completeLaunchData = {
        mission: "Mokes Launch",
        rocket: "Explorer IS1",
        target: "Kepler-1652 b",
        launchDate: "January 28, 2028",

    };

    const launchDataWithoutDate = {
        mission: "Mokes Launch",
        rocket: "Explorer IS1",
        target: "Kepler-1652 b"
    }

    const launchDataWithInvalidDate = {
        mission: "Mokes Launch",
        rocket: "Explorer IS1",
        target: "Kepler-1652 b",
        launchDate: 'root',
    }


    test('It should return response 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(completeLaunchData);
    });
    

    test('It should catch Invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);


        expect(response.body).toStrictEqual({
            error: 'Invalid launch date',
        });
    }); 
    
    test('It should check for missing fields', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing some required launch properties',
        });
    });


})