<template>
    <div>
      <h1>{{ msg }}</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  h1 {
    color: blue;
  }
  </style>
  