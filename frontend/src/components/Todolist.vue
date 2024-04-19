<template>
    <div class="container w-5/12 flex flex-col">
        <div class="px-6 py-4 whitespace-nowrap">
        <input type="text" placeholder="Add new task" v-model="taskTitle" class="w-half mt-4 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <input type="text" placeholder="Add status" v-model="taskStatus" class="w-half mt-2 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <button @click="addTask" class="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Add task</button>
        </div>
       
      <table class="min-w-fit divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in tasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="!task.editable">{{ task.title }}</span>
              <input v-else type="text" v-model="task.title" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="!task.editable">{{ task.status }}</span>
              <input v-else type="text" v-model="task.status" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <template v-if="task.editable">
                <button @click="updateTask(task)" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">Save</button>
                <button @click="cancelEdit(task)" class="ml-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">Cancel</button>
              </template>
              <template v-else>
                <button @click="toggleEdit(task)" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">Edit</button>
                <button @click="deleteTask(task.id)" class="ml-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">Delete</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    
   
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
          this.taskTitle = "";
          this.taskStatus = "";
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