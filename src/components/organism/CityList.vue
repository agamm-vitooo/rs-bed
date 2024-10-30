<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Daftar Kota</h2>
    <ul class="space-y-2">
      <li
        v-for="city in cities"
        :key="city.id"
        @click="selectCity(city.id)"
        class="cursor-pointer hover:text-blue-500 transition duration-200 flex justify-between items-center border-b border-gray-200 py-2"
      >
        <span>{{ city.name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['provinceId'],
  data() {
    return {
      cities: []
    };
  },
  watch: {
    provinceId: 'fetchCities'
  },
  methods: {
    async fetchCities() {
      if (!this.provinceId) return;
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${this.provinceId}`);
        this.cities = response.data.cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    selectCity(cityId) {
      this.$emit('select-city', cityId);
    }
  }
};
</script>
