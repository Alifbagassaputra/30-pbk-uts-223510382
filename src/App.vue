<template>
  <div class="container">
    <h1>Aplikasi Simpel TODO LIST</h1>
    <div class="todo-input-container">
      <input type="text" v-model="newTodo" class="todo-input" @keyup.enter="addTodo">
      <button class="todo-button" @click="addTodo">Add</button>
    </div>

    <ul>
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
        <span :class="{ 'completed': todo.completed }" class="todo-text" @click="toggleCompletion(todo)">
          {{ todo.text }}
        </span>
        <span class="todo-date">{{ todo.date }}</span>
        <button class="todo-delete" @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        this.todos.push({ text: this.newTodo, completed: false, date: formattedDate });
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleCompletion(todo) {
      todo.completed = !todo.completed;
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  width: 800px;
  margin: 20px auto;
  background-color: #4fb19d;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #ffffff;
  margin-bottom: 20px;
}

.todo-input {
  width: calc(100% - 80px);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-size: 16px;
}

.todo-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #b8dd75;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.todo-button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  color: #b8dd75;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-text {
  flex-grow: 1;
  cursor: pointer;
}

.todo-delete {
  background-color: #c6473e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 10px;
  cursor: pointer;
}

.todo-delete:hover {
  background-color: #9b3838;
}

.todo-text.completed {
  color: #e36255;
}  
.todo-date {
  color: #ffffff;
  font-size: 12px;
  margin-left: 5px;
}
</style>
