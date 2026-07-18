const express = require("express");

const app = express();

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

app.get("/api/habits", (req, res) => {
    res.json(habits);
});

app.listen(3000, () => {
    console.log("HabitStack API is running on port 3000");
});