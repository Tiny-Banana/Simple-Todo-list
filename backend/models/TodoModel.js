import db from "../config/database.js";

export const getTodos = (result) => {
    db.query("SELECT * FROM todo", (err, results) => {
        if (err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}

export const insertTodo = (data, result) => {
    db.query("INSERT INTO todo SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}


export const updateTodoById = (data, id, result) => {
    db.query("UPDATE INTO todo SET title = ?, status = ? WHERE id = ?", [data.title, data.status, id], (err, results) => {
        if (err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}

export const deleteTodoById = (id, result) => {
    db.query("DELETE FROM todo WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}