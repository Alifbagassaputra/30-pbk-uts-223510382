<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <button @click="showPosts" :class="{ active: currentView === 'posts' }">Post</button>
          <button @click="showTodos" :class="{ active: currentView === 'todos' }">Todos</button>
        </ul>
      </nav>
    </header>
    <div class="content">
      <div class="list-container">
        <h2 v-if="currentView === 'todos'">Jadwal</h2>
        <div v-if="currentView === 'todos'" class="list">
          <div v-for="(schedule, index) in schedules" :key="index" class="list-item" :class="{ 'completed': schedule.completed }">
            <div class="list-item-content">
              <input type="checkbox" v-model="schedule.completed" class="schedule-checkbox" @change="completeSchedule(schedule)">
              <p>{{ schedule.title }}</p>
              <button @click="removeSchedule(index)" class="delete-btn">Hapus</button>
            </div>
          </div>
          <div class="add-schedule">
            <input type="text" v-model="newSchedule" placeholder="Tambahkan jadwal baru..." class="schedule-input">
            <button @click="addSchedule" class="add-btn">Tambah</button>
          </div>
        </div>
        <h2 v-if="currentView === 'completed'">Jadwal Selesai</h2>
        <div v-if="currentView === 'completed'" class="list">
          <div v-for="(schedule, index) in completedSchedules" :key="index" class="list-item completed">
            <div class="list-item-content">
              <p>{{ schedule.title }}</p>
              <button @click="removeCompletedSchedule(index)" class="delete-btn">Hapus</button>
            </div>
          </div>
        </div>
        <h2 v-if="currentView !== 'todos'">Daftar Pengguna</h2>
        <input v-if="currentView !== 'todos'" type="text" v-model="searchQuery" placeholder="Cari pengguna..." class="search-input">
        <div v-if="currentView !== 'todos'" class="list">
          <div v-if="filteredUsers.length === 0" class="list-item">
            <div class="list-item-content">
              <p>User tidak ditemukan</p>
            </div>
          </div>
          <div v-else v-for="user in filteredUsers" :key="user.id" class="list-item" @click="selectUser(user.id)" :class="{ selected: user.id === selectedUserId }">
            <div class="list-item-content">
              <h3>{{ user.name }}</h3>
              <p><strong>Username:</strong> {{ user.username }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="spacer"></div>

      <div class="list-container">
        <h2 v-if="selectedUserId && currentView === 'posts'">Daftar Postingan Pengguna</h2>
        <p v-if="selectedUserId && currentView === 'posts'">Jumlah Postingan: {{ selectedUserPosts.length }}</p>
        <div v-if="selectedUserId && currentView === 'posts'" class="list">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      selectedUserId: null,
      searchQuery: '',
      currentView: 'todos',
      schedules: JSON.parse(localStorage.getItem('schedules')) || [],
      newSchedule: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchPosts(userId) {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      if (userId) {
        url += ?userId=${userId};
      }
      fetch(url)
        .then(response => response.json())
        .then(posts => {
          this.posts = posts.map(post => {
            const user = this.users.find(user => user.id === post.userId);
            post.user = user;
            return post;
          });
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
    selectUser(userId) {
      this.selectedUserId = userId;
      this.fetchPosts(userId);
    },
    showTodos() {
      this.currentView = 'todos';
    },
    showPosts() {
      this.currentView = 'posts';
    },
    addSchedule() {
      if (this.newSchedule.trim() !== '') {
        this.schedules.push({ title: this.newSchedule, completed: false });
        this.newSchedule = '';
        this.saveSchedules();
      }
    },
    removeSchedule(index) {
      this.schedules.splice(index, 1);
      this.saveSchedules();
    },
    completeSchedule(schedule) {
      schedule.completed = true;
      this.saveSchedules();
    },
    removeCompletedSchedule(index) {
      this.completedSchedules.splice(index, 1);
      this.saveCompletedSchedules();
    },
    saveSchedules() { 
      localStorage.setItem('schedules', JSON.stringify(this.schedules));
    },
    saveCompletedSchedules() {
      localStorage.setItem('completedSchedules', JSON.stringify(this.completedSchedules));
    }
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      } else {
        const filtered = this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        return filtered.length > 0 ? filtered : [{ id: null }];
      }
    },
    filteredPosts() {
      if (!this.selectedUserId) {
        return [];
      }
      return this.posts;
    },
    selectedUserPosts() {
      return this.filteredPosts.filter(post => post.userId === this.selectedUserId);
    },
    completedSchedules() {
      return this.schedules.filter(schedule => schedule.completed);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

header {
  background-color: #333;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
  margin: 15px 10px;
}

nav ul li a {
  text-decoration: none;
  color: #ffcc00;
  font-weight: bold;
}

nav ul li.active a {
  color: #ffcc00;
}

.list-container {
  flex: 1;
  width: 100%;
  max-width: 800px;
}

.content {
  color: #e68815;
  display: flex;
  justify-content: space-between;
}

.add-schedule {
  display: flex;
  align-items: center;
}

.add-schedule input {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
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

.list-item-content p {
  margin: 5px 0;
}

.list-item.completed .list-item-content p {
  text-decoration: line-through;
}

.delete-btn {
  padding: 6px 10px;
  background-color: #ff3333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  opacity: 0.8;
}

.add-btn {
  padding: 6px 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  opacity: 0.8;
}

.list-item.selected {
  background-color: #ffcc00;
}
</style>