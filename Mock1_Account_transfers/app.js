const express = require("express");

const app = express();
const transferRoutes = require("./routes/transferRoutes");

app.use(express.json());
app.use("/", transferRoutes);

module.exports = app;