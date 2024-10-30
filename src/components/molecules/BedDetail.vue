<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Detail Kapasitas Kasur</h2>
    <div v-if="bedDetail">
      <p class="mb-2"><strong>Nama Rumah Sakit:</strong> {{ bedDetail.name }}</p>
      <p class="mb-2"><strong>Alamat:</strong> {{ bedDetail.address }}</p>
      <p class="mb-2"><strong>Telepon:</strong> {{ bedDetail.phone }}</p>
      <p class="mb-2"><strong>Total Bed:</strong> {{ bedDetail.bed_availability }}</p>
      <p><strong>Available Bed:</strong> {{ bedDetail.bed_empty }}</p>
    </div>
    <div v-else>
      <p class="text-gray-500">Silakan pilih rumah sakit untuk melihat detail kapasitas kasur.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['hospitalId'],
  data() {
    return {
      bedDetail: null
    };
  },
  watch: {
    hospitalId(newVal) {
      console.log('Selected Hospital ID:', newVal); // Log untuk memastikan hospitalId benar
      this.fetchBedDetail();
    }
  },
  methods: {
    async fetchBedDetail() {
      if (!this.hospitalId) return;
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=5171133`);
        console.log('Bed Detail Response:', response.data); // Log respons API untuk memeriksa struktur data
        this.bedDetail = response.data.data; // Menyimpan bedDetail dari data API
      } catch (error) {
        console.error('Error fetching bed detail:', error);
      }
    }
  }
};
</script>
