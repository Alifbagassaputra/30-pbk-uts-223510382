<template>
  <div>
    <h1>POSTINGAN</h1>
    <div class="select-user">
      <label for="user-select">Pilih Pengguna:</label>
      <select id="user-select" v-model="selectedUser" @change="fetchPosts">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div v-if="posts.length > 0" class="post-list">
      <h2>Postingan: {{ selectedUserName }}</h2>
      <table class="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const selectedUser = ref(null);
const selectedUserName = ref('');
const posts = ref([]);

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchPosts = async () => {
  if (selectedUser.value) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      posts.value = await response.json();

      const selectedUserObj = users.value.find(user => user.id === parseInt(selectedUser.value));
      if (selectedUserObj) {
        selectedUserName.value = selectedUserObj.name;
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style>
.select-user {
  margin-bottom: 20px;
}

.select-user label {
  margin-right: 10px;
}

.select-user select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.post-list {
  margin-top: 20px;
}

.loading {
  margin-top: 20px;
  text-align: center;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.post-table th,
.post-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

.post-table th {
  background-color: #f4f4f4;
}
</style>
