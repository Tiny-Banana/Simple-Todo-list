import {
    getTodos,
    insertTodo,
    updateTodoById,
    deleteTodoById,
} from "../models/TodoModel.js";

export const showTodos = (req, res) => {
    getTodos((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const createTodo = (req, res) => {
    insertTodo(req.body, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    } )
}

export const updateTodo = (req, res) => {
    updateTodoById(req.body, req.params.id, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const deleteTodo = (req, res) => {
    deleteTodoById(req.params.id, (err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}