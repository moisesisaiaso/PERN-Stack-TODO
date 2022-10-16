const pool = require("../db");

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query("SELECT * FROM task");
        // res.send("retornando toda la lista de tareas");
        res.json(allTasks.rows);
    } catch (error) {
        /* res.json({
            error: error.message,
        }); */
        next(error);
    }
};

const getTask = async (req, res, next) => {
    // res.send("retornando una tarea");
    try {
        const { id } = req.params;
        const task = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

        if (task.rows.length === 0) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json(task.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO task (title, description)  VALUES ($1,$2) RETURNING *",
            [title, description]
        );

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    // res.send("deliting a task");
    try {
        const { id } = req.params;
        const task = await pool.query("DELETE FROM task WHERE id = $1", [id]);

        if (task.rowCount === 0)
            return res.status(404).json({
                message: "task not found",
            });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = await pool.query(
            "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        );
        if (task.rowCount === 0)
            return res.status(404).json({
                message: "task not found",
            });

        res.json(task.rows[0]);

        // res.send("updating a task");
    } catch (error) {
        next(error); //* manda el error hacia el middleware mas cercano
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};
