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

    const response = await request(app)
        .get("/transfers/1");

    expect(response.status).toBe(200);
});

it("returns 404 for unknown transfer", async () => {

    const response = await request(app)
        .get("/transfers/999");

    expect(response.status).toBe(404);
});