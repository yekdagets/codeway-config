const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configRoutes = require("./src/routes/configRouter");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/api/configs", configRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
