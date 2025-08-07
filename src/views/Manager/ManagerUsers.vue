<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useUserStore } from "../../stores/users";
import Pagination from "../../components/Pagination.vue";

const userStore = useUserStore();

const users = computed(() => userStore.users);
const loadError = computed(() => userStore.error || "");

const page = ref(1);
const pageSize = 10;

onMounted(() => {
  userStore.fetchUsers(page.value, pageSize);
});

watch(page, (newPage) => {
  userStore.fetchUsers(newPage, pageSize);
});

const totalPages = computed(() => userStore.pagination.totalPages || 1);

async function deleteUser(userId) {
  if (!confirm("Delete this user?")) return;
  await userStore.deleteUser(userId);
}

async function confirm() {
  for (const user of users.value) {
    await userStore.updateUserRole(user._id, user.role);
  }
  alert("User roles updated!");
}

function prevPage() {
  if (page.value > 1) page.value--;
}
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
</script>

<template>
  <div class="admin-container">
    <div class="admin-toolbar">
      <router-link to="/admin" class="toolbar-btn">Manage Users</router-link>

      <router-link to="/manager/add" class="toolbar-btn">Add product</router-link>
    </div>
    <div class="user-box">
      <h2>Manage User</h2>
      <p v-if="loadError" class="error-msg">{{ loadError }}</p>
      <table v-else class="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.email }}</td>
            <td>{{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}</td>
            <td>
              <select v-model="user.role" class="role-select">
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <button class="icon-btn danger" @click="deleteUser(user._id)">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <Pagination
          :currentPage="page"
          :totalPages="totalPages"
          @change-page="(newPage) => (page = newPage)"
        />
      </div>
      <div class="confirm-btn-wrap">
        <button class="confirm-btn" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.8rem;
  background: radial-gradient(ellipse at center, #233246 70%, #202b3a 100%);
}

.admin-toolbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.2rem;
}

.toolbar-btn {
  background: linear-gradient(90deg, #17b8fa 0%, #5073fa 100%);
  color: #fff;
  border-radius: 6px;
  padding: 0.35rem 2.1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  text-decoration: none;
  margin: 0 0.5rem;
  box-shadow: 0 1px 6px rgba(80, 120, 250, 0.1);
  cursor: pointer;
  transition: background 0.15s;
}
.toolbar-btn:hover {
  filter: brightness(1.1);
}

.user-box {
  width: 70vw;
  min-width: 440px;
  background: #1b222d;
  border: 2px solid #16aaff;
  border-radius: 5px;
  padding: 2.4rem 2.5rem 2rem;
  box-sizing: border-box;
  margin-top: 0;
}

.user-box h2 {
  color: #19a2ff;
  font-size: 1.3rem;
  margin-bottom: 1.3rem;
  font-weight: 400;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  color: #fff;
}
.user-table th,
.user-table td {
  text-align: left;
  padding: 0.7rem 1rem 0.7rem 0.5rem;
  border: none;
  font-size: 1.13rem;
}
.user-table th {
  color: #16aaff;
  font-weight: bold;
}
.user-table tr:not(:last-child) td {
  border-bottom: 1px solid #263850;
}
.error-msg {
  color: #ff5252;
  margin-bottom: 1rem;
}
.role-select {
  background: #27344a;
  color: #fff;
  border-radius: 4px;
  border: 1px solid #3b82f6;
  padding: 0.3rem 1.2rem 0.3rem 0.5rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}
.icon-btn {
  background: #242e45;
  border: none;
  border-radius: 4px;
  color: #3b82f6;
  margin-left: 0.3rem;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 3px 9px;
  transition: background 0.15s;
  vertical-align: middle;
}

/* pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}
.pagination button {
  width: 32px;
  height: 32px;
  border: none;
  background: #34495e;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button.active {
  background: #535bc9;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.icon-btn:hover {
  background: #233377;
  color: #fff;
}
.icon-btn.danger {
  color: #ff5252;
}
.confirm-btn-wrap {
  display: flex;
  justify-content: center;
}
.confirm-btn {
  margin-top: 1.6rem;
  padding: 0.85rem 3.2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #16cdfa 0%, #3876fa 100%);
  color: #fff;
  font-size: 1.13rem;
  font-weight: bold;
  cursor: pointer;
  transition: filter 0.17s;
}
.confirm-btn:hover {
  filter: brightness(1.11);
}
</style>
