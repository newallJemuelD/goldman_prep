const request = require("supertest");

const app = require("../app");
const sequelize = require("../database");

const Alert = require("../models/alert");


beforeEach(async () => {

    await sequelize.sync({
        force: true
    });


    await Alert.bulkCreate([
        {
            id: 1,
            customerName: "Ava",
            riskScore: 85,
            status: "open"
        },
        {
            id: 2,
            customerName: "Ben",
            riskScore: 40,
            status: "resolved"
        },
        {
            id: 3,
            customerName: "Cara",
            riskScore: 65,
            status: "open"
        },
        {
            id: 4,
            customerName: "Dan",
            riskScore: 92,
            status: "open"
        }
    ]);

});


afterAll(async () => {
    await sequelize.close();
});


it("returns all alerts", async () => {

    const response =
        await request(app)
            .get("/alerts");


    expect(response.status).toBe(200);

    expect(response.body.length).toBe(4);
});


it("filters alerts by status and score range", async () => {

    const response =
        await request(app)
            .get(
                "/alerts?status=open&minScore=60&maxScore=90"
            );


    expect(response.status).toBe(200);

    expect(response.body.length).toBe(2);

    expect(response.body[0].customerName)
        .toBe("Ava");

    expect(response.body[1].customerName)
        .toBe("Cara");
});


it("rejects a request with only one score limit", async () => {

    const response =
        await request(app)
            .get("/alerts?minScore=60");


    expect(response.status).toBe(400);
});


it("resolves an open alert", async () => {

    const response =
        await request(app)
            .patch("/alerts/1/resolve");


    expect(response.status).toBe(200);

    expect(response.body.status)
        .toBe("resolved");


    const alert =
        await Alert.findByPk(1);


    expect(alert.status)
        .toBe("resolved");
});


it("rejects an already resolved alert", async () => {

    const response =
        await request(app)
            .patch("/alerts/2/resolve");


    expect(response.status).toBe(409);
});


it("returns 404 for an unknown alert", async () => {

    const response =
        await request(app)
            .patch("/alerts/999/resolve");


    expect(response.status).toBe(404);
});