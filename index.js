const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const configRoutes = require("./src/routes/configRouter");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/configs", configRoutes);
const PORT = process.env.PORT || 3000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
