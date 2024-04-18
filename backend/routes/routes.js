import express from "express";
import {
    showTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/products", showTodos);
router.post("/products", createTodo);
router.put("/products/:id", updateTodo);
router.delete("/products/:id", deleteTodo);

export default router;
