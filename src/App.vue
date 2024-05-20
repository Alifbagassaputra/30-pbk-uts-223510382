<template>
  <div class="container">
    <header>
      <Navigation :currentView="currentView" @view-change="changeView" />
    </header>
    <div class="content">
      <div class="list-container">
        <ScheduleList 
          v-if="currentView === 'todos'" 
          :schedules="schedules" 
          @add-schedule="addSchedule" 
          @remove-schedule="removeSchedule" 
          @complete-schedule="completeSchedule" 
        />
        <UserList 
          v-if="currentView !== 'todos'" 
          :users="users" 
          :selectedUserId="selectedUserId" 
          @select-user="selectUser" 
        />
      </div>
      <div class="spacer"></div>
      <div class="list-container">
        <PostList 
          v-if="selectedUserId && currentView === 'posts'" 
          :posts="posts" 
          :selectedUserId="selectedUserId" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import ScheduleList from './components/ScheduleList.vue';
import UserList from './components/UserList.vue';
import PostList from './components/PostList.vue';

export default {
  components: {
    Navigation,
    ScheduleList,
    UserList,
    PostList
  },
  data() {
    return {
      users: [],
      posts: [],
      selectedUserId: null,
      currentView: 'todos',
      schedules: JSON.parse(localStorage.getItem('schedules')) || []
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
        url += `?userId=${userId}`;
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
    changeView(view) {
      this.currentView = view;
    },
    addSchedule(newSchedule) {
      this.schedules.push({ title: newSchedule, completed: false });
      this.saveSchedules();
    },
    removeSchedule(index) {
      this.schedules.splice(index, 1);
      this.saveSchedules();
    },
    completeSchedule(schedule) {
      schedule.completed = true;
      this.saveSchedules();
    },
    saveSchedules() {
      localStorage.setItem('schedules', JSON.stringify(this.schedules));
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
.content {
  display: flex;
  justify-content: space-between;
}
.spacer {
  width: 20px;
}
</style>
