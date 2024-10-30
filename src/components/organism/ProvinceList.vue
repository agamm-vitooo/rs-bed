<!-- ProvinceList.vue -->
<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Daftar Provinsi</h1>
    <ul class="space-y-2 max-h-80 overflow-y-auto">
      <li
        v-for="province in provinces"
        :key="province.id"
        @click="selectProvince(province.id)"
        class="px-4 py-3 rounded-md bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shadow-sm flex items-center justify-between"
      >
        <span>{{ province.name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProvinceList',  // Nama komponen
  data() {
    return {
      provinces: []  // Menyimpan data provinsi
    };
  },
  created() {
    this.fetchProvinces();  // Memanggil method untuk fetch provinsi saat komponen dibuat
  },
  methods: {
    async fetchProvinces() {
      try {
        // Mengambil data dari API
        const response = await axios.get('https://rs-bed-covid-api.vercel.app/api/get-provinces');
        this.provinces = response.data.provinces;  // Menyimpan data provinsi ke dalam state
      } catch (error) {
        console.error('Error fetching provinces:', error);  // Menangani error jika fetch gagal
      }
    },
    selectProvince(provinceId) {
      this.$emit('select-province', provinceId);  // Mengeluarkan event ketika provinsi dipilih
    }
  }
};
</script>


