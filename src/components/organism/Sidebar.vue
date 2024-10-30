<template>
  <div>
    <!-- Backdrop for mobile -->
    <div
      v-if="modelValue"
      @click="$emit('update:modelValue', false)"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-30"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[ 
        'fixed inset-y-0 left-0 z-40 w-64 bg-slate-100 border border-r-2 overflow-y-auto transition-transform duration-300 transform', 
        modelValue ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' 
      ]"
    >
      <!-- Sidebar content -->
      <div class="flex flex-col h-full">
        <!-- Logo section -->
        <div class="flex items-center justify-center h-16 bg-gray-900">
          <span class="text-white text-xl font-bold">Dashboard</span>
        </div>

        <!-- Navigation Links -->
        <nav class="mt-5 flex-1">
          <div class="px-2 space-y-1">
            <router-link
              v-for="(item, index) in menuItems"
              :key="index"
              :to="item.path"
              @click="closeSidebarOnMobile"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                { 'bg-gray-900 text-white': $route.path === item.path } // Highlights active route
              ]"
            >
              <span class="mr-3 h-6 w-6" v-html="item.icon"></span>
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
  name: 'Sidebar',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      menuItems: [
        {
          name: 'Home',
          path: '/',
          icon: `<svg class="text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>`
        },
        {
          name: 'ListRS',
          path: '/listRS',
          icon: `<svg class="text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>`
        },
      ]
    }
  },
  methods: {
    closeSidebarOnMobile() {
      this.$emit('update:modelValue', false); // Close sidebar on mobile after clicking
    }
  }
}
</script>
