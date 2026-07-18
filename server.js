const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "habitstack-secret-key";

app.use(express.json());

const habits = [
    {
        id: 1,
        name: "Meditate",
        goal: "10 minutes daily"
    },
    {
        id: 2,
        name: "Read",
        goal: "20 minutes daily"
    }
];

const users = [];

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid token format"
        });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}


app.get("/api/habits", authenticateToken, (req, res) => {

    res.json(habits);

});


app.get("/api/habits/:id", authenticateToken, (req, res) => {

    const id = parseInt(req.params.id);

    const habit = habits.find((habit) => habit.id === id);

    if (!habit) {
        return res.status(404).json({
            message: "Habit not found"
        });
    }

    res.json(habit);

});


app.post("/api/habits", authenticateToken, (req, res) => {

    if (!req.body.name || !req.body.goal) {
        return res.status(400).json({
            message: "Name and goal are required"
        });
    }

    const newHabit = {
        id: habits.length + 1,
        name: req.body.name,
        goal: req.body.goal
    };

    habits.push(newHabit);

    res.status(201).json(newHabit);

});


app.put("/api/habits/:id", authenticateToken, (req, res) => {

    const id = parseInt(req.params.id);

    const habit = habits.find((habit) => habit.id === id);

    if (!habit) {
        return res.status(404).json({
            message: "Habit not found"
        });
    }

    if (!req.body.name || !req.body.goal) {
        return res.status(400).json({
            message: "Name and goal are required"
        });
    }

    habit.name = req.body.name;
    habit.goal = req.body.goal;

    res.json(habit);

});


app.delete("/api/habits/:id", authenticateToken, (req, res) => {

    const id = parseInt(req.params.id);

    const index = habits.findIndex((habit) => habit.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Habit not found"
        });
    }

    const deletedHabit = habits.splice(index, 1);

    res.json({
        message: "Habit deleted successfully",
        habit: deletedHabit[0]
    });

});


app.post("/api/auth/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });

});


app.post("/api/auth/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        {
            userId: user.id
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.status(200).json({
        message: "Login successful",
        token: token
    });

});


app.listen(3000, () => {
    console.log("HabitStack API is running on port 3000");
});