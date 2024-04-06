import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./storage/db";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

connectDB(MONGODB_URI);

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({ "Message": "Hello World" });
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});