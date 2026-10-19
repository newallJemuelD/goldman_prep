const express = require("express");

const app = express();

const alertRoutes = require("./routes/alertRoutes");

app.use(express.json());

app.use("/", alertRoutes);

module.exports = app;