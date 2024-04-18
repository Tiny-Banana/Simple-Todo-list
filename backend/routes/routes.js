import express from "express";
import {
    showTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/todos", showTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
