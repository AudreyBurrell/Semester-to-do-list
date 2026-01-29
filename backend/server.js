//I am just importing a bunch of things now (things I had in previous projects), I will delete what I don't need later
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
//imports from other pages

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

const dataFilePath = path.resolve("data/users.json");
const assignmentsFilePath = path.resolve("data/assignments.json");
const classesFilePath = path.resolve("data/classes.json");

//routes go here for other backend code. Ex: app.use("/api/savedSets", savedSetsRoutes) 



//login and create account
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = fs.existsSync(dataFilePath)
            ? JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
            : [];
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        } 
        res.json({ success: true, message: "Login successful!", userId: username });
    } catch (err) {
        console.error("Error reading from users.json:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
});
// app.post("/create-account", async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const data = fs.existsSync(dataFilePath)
//             ? JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
//             : []; 
//         if (data.find(u => u.username === username)){
//             return res.status(400).json({ success: false, message: "Username already exists." })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         data.push({ username, password: hashedPassword });
//         fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
//         res.json({ success: true, message: "Account created successfully!" });
//     } catch (err) {
//         console.error("Error writing to users.json:", err);
//         res.status(500).json({ success: false, message: "Server error." });
//     }
// });
app.post("/create-account", async (req, res) => {
    const { username, password } = req.body;
    
    // Add debugging
    console.log("Received body:", req.body);
    console.log("Username:", username);
    console.log("Password:", password);
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Username and password are required." 
        });
    }
    
    try {
        const data = fs.existsSync(dataFilePath)
            ? JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
            : []; 
        if (data.find(u => u.username === username)){
            return res.status(400).json({ success: false, message: "Username already exists." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        data.push({ username, password: hashedPassword });
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        res.json({ success: true, message: "Account created successfully!", userId: username });
    } catch (err) {
        console.error("Error writing to users.json:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
});

//saving assignments to backend
app.post("/api/assignments", async (req, res) => {
    const { userId, assignments } = req.body;
    if(!userId || !assignments) {
        return res.status(400).json({ success: false, message: "userId and assignments are required." });
    }
    try {
        const allAssignments = fs.existsSync(assignmentsFilePath)
            ? JSON.parse(fs.readFileSync(assignmentsFilePath, "utf8"))
            : {};
        allAssignments[userId] = assignments;
        fs.writeFileSync(assignmentsFilePath, JSON.stringify(allAssignments, null, 2));
        res.json({ success: true, message: "Assignments saved!" });
    } catch (err) {
        console.error("Error saving assignments:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
});
//getting the assignments for said user
app.get("/api/assignments/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const allAssignments = fs.existsSync(assignmentsFilePath)
            ? JSON.parse(fs.readFileSync(assignmentsFilePath, "utf8"))
            : {};
        const userAssignments = allAssignments[userId] || {};
        res.json({ success: true, assignments: userAssignments });
    } catch (err) {
        console.error("Error loading assignments:", err);
        res.status(500).json({ success: false, message: "Server error." });
    }
});


//stuff for testing if it's running
app.get("/", (req, res) => {
    res.send("Assignment Tracker backend is running!")
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});