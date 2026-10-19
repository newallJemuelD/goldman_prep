const request = require("supertest");

const app = require("../app");
const sequelize = require("../database");

const Account = require("../models/account");
const Transfer = require("../models/transfer");


beforeEach(async () => {

    // Start every test with a fresh database
    await sequelize.sync({
        force: true
    });


    // Seed accounts
    await Account.bulkCreate([
        {
            id: 1,
            name: "Alice",
            balance: 1000
        },
        {
            id: 2,
            name: "Bob",
            balance: 500
        },
        {
            id: 3,
            name: "Charlie",
            balance: 0
        }
    ]);

});

afterAll(async () => {
    await sequelize.close();
});

it("creates a successful transfer", async () => {

    const response = await request(app)
        .post("/transfers")
        .send({
            fromAccountId: 1,
            toAccountId: 2,
            amount: 200
        });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("completed");
});

it("rejects insufficient funds", async () => {

    const response = await request(app)
        .post("/transfers")
        .send({
            fromAccountId: 2,
            toAccountId: 1,
            amount: 1000
        });

    expect(response.status).toBe(409);
});

it("rejects a transfer to the same account", async () => {

    const response = await request(app)
        .post("/transfers")
        .send({
            fromAccountId: 1,
            toAccountId: 1,
            amount: 100
        });

    expect(response.status).toBe(400);
});

it("retrieves an existing transfer", async () => {

    await Transfer.create({
        id: 1,
        fromAccountId: 1,
        toAccountId: 2,
        amount: 100,
        status: "completed"
    });

    const response = await request(app)
        .get("/transfers/1");

    expect(response.status).toBe(200);
});

it("returns 404 for unknown transfer", async () => {

    const response = await request(app)
        .get("/transfers/999");

    expect(response.status).toBe(404);
});