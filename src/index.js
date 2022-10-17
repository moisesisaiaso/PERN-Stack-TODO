const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRoutes = require("./routes/tasks.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(taskRoutes);

app.use((err, req, res, next) => {
    //* esto es un manejador de errores para todas las funciones del controlador
    return res.json({
        message: err.message,
    });
});
//s
app.listen(4000);
console.log("server on port 4000");
