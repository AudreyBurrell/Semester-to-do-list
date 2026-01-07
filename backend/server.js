//I am just importing a bunch of things now (things I had in previous projects), I will delete what I don't need later
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
//when I do bcrypt, put it here
//imports from otehr pages

const app = express();
const PORT = 5173;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

//routes go here. Ex: app.use("/api/savedSets", savedSetsRoutes)

app.get("/", (req, res) => {
    res.send("Assignment Tracker backend is running!")
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});