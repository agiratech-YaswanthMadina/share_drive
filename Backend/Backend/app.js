const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const defaultRoutes = require("./routes/router");

app.use(cors());

app.use("/api", defaultRoutes);

app.listen(port);
