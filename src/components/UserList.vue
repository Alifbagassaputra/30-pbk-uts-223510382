<template>
  <div class="list-container">
    <h2>Daftar Pengguna</h2>
    <input type="text" v-model="searchQuery" placeholder="Cari pengguna..." class="search-input">
    <div class="list">
      <div v-if="filteredUsers.length === 0" class="list-item">
        <div class="list-item-content">
          <p>User tidak ditemukan</p>
        </div>
      </div>
      <div v-else v-for="user in filteredUsers" :key="user.id" class="list-item" @click="$emit('select-user', user.id)" :class="{ selected: user.id === selectedUserId }">
        <div class="list-item-content">
          <h3>{{ user.name }}</h3>
          <p><strong>Username:</strong> {{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['users', 'selectedUserId'],
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      } else {
        return this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
};
</script>

<style scoped>
.list-container {
  flex: 1;
  width: 100%;
  max-width: 800px;
}
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.list {
  background-color: #f6c445;
  border-radius: 8px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}
.list-item {
  margin-bottom: 10px;
  background-color: #f3c262;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.list-item.selected {
  background-color: #ffcc00;
}
</style>
