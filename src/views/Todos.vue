<template>
    <main class="app">
      <section class="create-todo">
        <h3>APLIKASI TODO-LIST</h3>
  
        <form id="new-todo-form" @submit.prevent="addTodo">
          <h4>TAMBAHKAN PERINTAH</h4>
          <input 
            type="text" 
            name="content" 
            id="content" 
            placeholder="Type your task here"
            v-model="input_content" />
  
          <label for="category">Category:</label>
          <select id="category" v-model="input_category">
            <option value="" disabled>Select category</option>
            <option value="personal">Personal</option>
            <option value="college">College</option>
          </select>
  
          <input type="submit" value="Add todo" class="btn-add" />
        </form>
      </section>
  
      <section class="todo-list">
        <h3>TODO LIST</h3>
        <div class="list" id="todo-list">
          <div v-for="todo in todos" :key="todo.createdAt" :class="`todo-item ${todo.done ? 'done' : ''}`">
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span :class="['bubble', todo.category === 'personal' ? 'personal' : 'college']"></span>
            </label>
  
            <div class="todo-content">
              <input type="text" v-model="todo.content" :disabled="!todo.editable" />
            </div>
  
            <div class="actions">
              <button class="btn-delete" @click="removeTodo(todo)">Delete</button>
              <button class="btn-edit" @click="toggleEdit(todo)">{{ todo.editable ? 'Save' : 'Edit' }}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  
  const todosData = ref([]);
  const input_content = ref('');
  const input_category = ref(null);
  
  const todos = computed(() => todosData.value.sort((a, b) => a.createdAt - b.createdAt));
  
  const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
      return;
    }
  
    todosData.value.push({
      content: input_content.value,
      category: input_category.value,
      done: false,
      editable: false,
      createdAt: new Date().getTime(),
    });
    input_content.value = '';
    input_category.value = null;
  };
  
  const removeTodo = (todo) => {
    todosData.value = todosData.value.filter((t) => t !== todo);
  };
  
  const toggleEdit = (todo) => {
    todo.editable = !todo.editable;
  };
  
  onMounted(() => {
    todosData.value = JSON.parse(localStorage.getItem('todos')) || [];
  });
  
  watch(todosData, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal));
  }, {
    deep: true,
  });
  </script>
  
  <style>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .create-todo,
  .todo-list {
    width: 100%;
    max-width: 500px;
  }
  
  .create-todo {
    margin-bottom: 20px;
  }
  
  .todo-list {
    margin-top: 20px;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .todo-item.done {
    background-color: #cee0e6;
  }
  
  .bubble {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
  
  .bubble.personal {
    background-color: #007bff;
  }
  
  .bubble.college {
    background-color: #ffc107;
  }
  
  .todo-content input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .actions {
    display: flex;
    align-items: center;
  }
  
  .actions button {
    margin-left: 10px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .actions .btn-delete {
    background-color: #dc3545;
    color: white;
  }
  
  .actions .btn-edit {
    background-color: #007bff;
    color: white;
  }
  
  .btn-add {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  