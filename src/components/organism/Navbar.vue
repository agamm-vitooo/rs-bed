<!-- Navbar.vue -->
<template>
  <nav class="bg-slate-100 shadow-lg fixed w-full top-0 left-0 right-0 z-50">
    <div class="max-w-full mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Menu button for mobile -->
        <button 
          @click="toggleSidebar"
          class="text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <span class="text-xl font-bold text-gray-800">Logo</span>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xl mx-4">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Search..."
              class="w-full bg-gray-200 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    },
    toggleSidebar() {
      this.$emit('update:isSidebarOpen', !this.isSidebarOpen)
    }
  }
}
</script>