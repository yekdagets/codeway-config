import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import configRoutes from "./src/routes/configRouter.js";
import dotenv from "dotenv";
dotenv.config();

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
