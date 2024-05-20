<template>
  <div class="list-container">
    <h2 v-if="selectedUserId">Daftar Postingan Pengguna</h2>
    <p v-if="selectedUserId">Jumlah Postingan: {{ selectedUserPosts.length }}</p>
    <div class="list">
      <div v-if="filteredPosts.length === 0" class="list-item">
        <div class="list-item-content">
          <p>Postingan tidak ditemukan</p>
        </div>
      </div>
      <div v-else v-for="post in filteredPosts" :key="post.id" class="list-item">
        <div class="list-item-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <p><strong>Penulis:</strong> {{ post.user ? post.user.name : 'Unknown' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts', 'selectedUserId'],
  computed: {
    filteredPosts() {
      if (!this.selectedUserId) {
        return [];
      }
      return this.posts.filter(post => post.userId === this.selectedUserId);
    },
    selectedUserPosts() {
      return this.filteredPosts;
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
</style>
