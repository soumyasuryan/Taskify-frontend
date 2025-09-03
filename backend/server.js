import express from 'express';
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

let tasks = [];
let idCounter = 1;

// Add task
app.post("/tasks", (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task is required!!!" });
    }

    const newTask = { id: idCounter++, task }; // 👈 add id
    tasks.push(newTask);

    res.json(newTask); // return the new task
});

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Delete a task by id
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== parseInt(id));
    res.json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
