<template>
    <nav>
      <ul>
        <button @click="$emit('view-change', 'posts')" :class="{ active: currentView === 'posts' }">Post</button>
        <button @click="$emit('view-change', 'todos')" :class="{ active: currentView === 'todos' }">Todos</button>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: ['currentView']
  };
  </script>
  
  <style scoped>
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav ul li {
    display: inline-block;
    margin: 15px 10px;
  }
  nav ul li button {
    background: none;
    border: none;
    color: #ffcc00;
    font-weight: bold;
    cursor: pointer;
  }
  nav ul li button.active {
    color: #ffcc00;
  }
  </style>
  