// src/store/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,     // { email }
    role: null      // 'manager' | 'user'
  }),
  actions: {
    login(email, password) {
      // Demo login logic
      if (email === 'manager@gamestore.com' && password === 'manager123') {
        this.user = { email }
        this.role = 'manager'
      } else if (email === 'user@gamestore.com' && password === 'user123') {
        this.user = { email }
        this.role = 'user'
      } else {
        throw new Error('Invalid credentials')
      }
      // Persist
      localStorage.setItem('authUser', JSON.stringify(this.user))
      localStorage.setItem('authRole', this.role)
    },
    logout() {
      this.user = null
      this.role = null
      localStorage.removeItem('authUser')
      localStorage.removeItem('authRole')
    },
    restore() {
      const user = localStorage.getItem('authUser')
      const role = localStorage.getItem('authRole')
      if (user && role) {
        this.user = JSON.parse(user)
        this.role = role
      }
    }
  }
})
