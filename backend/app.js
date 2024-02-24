import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

export default app;
