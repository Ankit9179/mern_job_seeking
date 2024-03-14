import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
//import routers from routers folders
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
//import mongodata connection
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();
//cors configuring for all foutes
app.use(cors());

//
app.use(express.json()); // parse the json data in javascript from frontedn
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//user file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//use routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

//mongo connection
dbConnection();

export default app;
