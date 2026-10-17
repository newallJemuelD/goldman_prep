

# Running tests for one specific project 

npx jest Mock1_Account_transfers/tests/transfer.test.js --runInBand
or 
npm test -- Mock1_Account_transfers/tests/transfer.test.js

other folders 
npm test -- REST_books/tests
npm test -- REST_books/tests

//terminal commands 
npm test -- Mock1_Account_transfers/tests/transfer.test.js
npm test -- REST_payment/tests

----------------------------------------------------------------------

# Each project should have seperate database 

Mock1_Account_transfers/database.js - file content below 

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
});

module.exports = sequelize;

---------------------------------------------------------------------

# App.js template 

// Mock1_Account_transfers/app.js

const express = require("express");

const app = express();
const transferRoutes =
    require("./routes/transferRoutes");
app.use(express.json());
app.use("/", transferRoutes);

module.exports = app;

-----

//Books project 

const express = require("express");

const app = express();
const bookRoutes =
    require("./routes/bookRoutes");
app.use(express.json());
app.use("/", bookRoutes);

module.exports = app;