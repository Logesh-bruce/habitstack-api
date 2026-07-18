const express = require("express");

const app = express();
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

app.get("/api/habits", (req, res) => {
    res.json(habits);
});
app.get("/api/habits/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const habit = habits.find((habit) => habit.id === id);

    if (!habit) {
        return res.status(404).json({
            message: "Habit not found"
        });
    }

    res.json(habit);
});


app.post("/api/habits", (req, res) => {

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

app.listen(3000, () => {
    console.log("HabitStack API is running on port 3000");
});