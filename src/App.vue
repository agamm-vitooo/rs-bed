<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar Component -->
    <Navbar 
      :is-sidebar-open="isSidebarOpen"
      @update:is-sidebar-open="isSidebarOpen = $event"
      @search="handleSearch" 
    />
    
    <!-- Sidebar Component -->
    <Sidebar 
      v-model="isSidebarOpen"
    />
    
    <!-- Main Content with Router View -->
    <div :class="['lg:ml-64', 'mt-16', 'p-4']">
      <div class="max-w-7xl mx-auto">
        <!-- Display the content based on the current route -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/organism/Navbar.vue'
import Sidebar from './components/organism/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      isSidebarOpen: false,
      searchQuery: ''
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
      console.log('Searching for:', query)
    },
    handleExplore() {
      console.log('Explore button clicked')
    }
  }
}
</script>
