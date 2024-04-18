<template>
    <div>
    <table>
        <thead>
            <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks" :key="task.id">
                <td>
                    <span v-if="!task.editable">{{ task.title }}</span>
                    <input v-else type="text" v-model=task.title>
                </td>
                <td>
                    <span v-if="!task.editable">{{ task.status }}</span>
                    <input v-else type="text" v-model=task.status>
                </td>
                <td>
                    <template v-if="task.editable">
                        <button @click="updateTask(task)">Save</button>
                        <button @click="cancelEdit(task)">Cancel</button>
                    </template>
                    <template v-else>
                        <button @click="toggleEdit(task)">Edit</button>
                        <button @click="deleteTask(task.id)">Delete</button>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
    <input type="text" placeholder="Add new task" v-model="taskTitle">
    <input type="text" placeholder="Add statuts" v-model="taskStatus">
    <button @click="addTask">Add task</button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            taskTitle: "",
            taskStatus: "",
            tasks: [],
        };
    },
    created() {
        this.getTodos();
    },
    methods: {
        async getTodos() {
            try {
                const response = await axios.get("http://localhost:5000/todos");
                this.tasks = response.data.map(task => ({
                    ...task,
                    editable: false 
                    }));
            } catch (err) {
                console.log(err)
            }
        },
        async deleteTask(id) {
            try {
                await axios.delete(`http://localhost:5000/todos/${id}`);
                this.getTodos();
            } catch(err) {
                console.log(err);
            }
        },
        async addTask() {
           try {
                await axios.post("http://localhost:5000/todos", {
                title: this.taskTitle,
                status: this.taskStatus,
            });
            (this.taskTitle = ""), (this.taskStatus = "");
            this.getTodos();
           } catch(err) {
            console.log(err);
           }
        },
        async updateTask(task) {
            try {
                await axios.put(`http://localhost:5000/todos/${task.id}`, {
                    title: task.title,
                    status: task.status,
                });
                this.getTodos();
            } catch (err) {
                console.log(err);
            }
        },
        cancelEdit(task) {
            this.toggleEdit(task);
            this.getTodos();
        },
        toggleEdit(task) {
            task.editable = !task.editable;
        },
    }
}
</script>
<style lang="">
    
</style>