<template>
  <div class="list-container">
    <h2>Jadwal</h2>
    <div class="list">
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
  </div>
</template>

<script>
export default {
  props: ['schedules'],
  data() {
    return {
      newSchedule: ''
    };
  },
  methods: {
    addSchedule() {
      if (this.newSchedule.trim() !== '') {
        this.$emit('add-schedule', this.newSchedule);
        this.newSchedule = '';
      }
    },
    removeSchedule(index) {
      this.$emit('remove-schedule', index);
    },
    completeSchedule(schedule) {
      this.$emit('complete-schedule', schedule);
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
.list-item.completed .list-item-content p {
  text-decoration: line-through;
}
.delete-btn, .add-btn {
  padding: 6px 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn:hover, .add-btn:hover {
  opacity: 0.8;
}
</style>
