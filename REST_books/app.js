const express = require("express");

const sequelize = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");

const app = express();


// Allows JSON request bodies
app.use(express.json());


// Routes
app.use("/books", bookRoutes);


// Database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });


module.exports = app;