import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//import routers from routers folders
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
//import mongodata connection
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();
//cors configuring
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

//
app.use(express.json()); // parse the json data in javascript from frontedn
app.use(express.urlencoded({ extended: true }));

//use routers
app.use("/api/vi/user", userRouter);
app.use("/api/vi/job", jobRouter);
app.use("/api/vi/application", applicationRouter);

//mongo connection
dbConnection();

export default app;
