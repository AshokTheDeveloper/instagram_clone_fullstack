// Core
const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
dotEnv.config();

// Local
const initializeDBAndServer = require("./utils/initializeDBAndServer");
const userRoutes = require("./routes/userRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "data sent" });
});

initializeDBAndServer(app);
