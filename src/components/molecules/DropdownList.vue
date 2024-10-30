<template>
  <div class="relative">
    <button @click="toggleDropdown" class="w-full bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none">
      <span>{{ selectedItem || placeholder }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 ease-in-out" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
      </svg>
    </button>
    <transition name="fade">
      <div v-if="isOpen" class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto transition duration-300 ease-in-out">
        <ul>
          <li v-for="item in items" :key="item.id" @click="selectItem(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-3 my-1 mx-2 rounded-lg transition duration-200 ease-in-out">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownList',
  props: {
    items: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select an item'
    }
  },
  data() {
    return {
      isOpen: false,
      selectedItem: null
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selectedItem = item.name;
      this.isOpen = false;
      this.$emit('select', item.id);
    }
  }
};
</script>

<style scoped>
/* Tambahkan transisi fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in Vue <2.1.8 */ {
  opacity: 0;
}

/* Tambahan gaya agar dropdown lebih smooth dan elegan */
button {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

ul {
  padding: 0;
}

li {
  padding: 0.75rem; /* Ukuran padding lebih besar */
  font-size: 1rem;
  margin: 0.25rem 0; /* Jarak antar item */
  transition: background-color 0.3s ease;
  border-radius: 8px; /* Tambah radius agar item terlihat lebih rounded */
}
</style>
