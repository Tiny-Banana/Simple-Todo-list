<template>
    <div class="flex justify-center items-center h-screen">
      <Todolist/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Todolist from '@/components/Todolist.vue'
  
  export default {
    name: 'Index',
    components: {
      Todolist
    }
  }
  </script>
  