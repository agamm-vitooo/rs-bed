<template>
  <div class="container mx-auto p-4 text-black">
    <DropdownList 
      :items="provinces" 
      placeholder="Pilih Provinsi" 
      @select="setProvinceId" 
    />
    <DropdownList 
      v-if="provinceId" 
      :items="cities" 
      placeholder="Pilih Kota" 
      @select="setCityId" 
    />
    <DropdownList 
      v-if="provinceId && cityId" 
      :items="hospitals" 
      placeholder="Pilih Rumah Sakit" 
      @select="setHospitalId" 
    />
    
    <div v-if="hospitalId">
      <BedDetail :hospitalId="hospitalId" />
      <div v-if="bedDetail">
        <h3 class="text-lg font-bold">Detail Kapasitas Kasur</h3>
        <p><strong>Nama Rumah Sakit:</strong> {{ bedDetail.name }}</p>
        <p><strong>Alamat:</strong> {{ bedDetail.address }}</p>
        <p><strong>Telepon:</strong> {{ bedDetail.phone }}</p>
        <p><strong>Total Bed:</strong> {{ bedDetail.bed_availability }}</p>
        <p><strong>Available Bed:</strong> {{ bedDetail.bed_empty }}</p>
      </div>
      <div v-if="hospitalMap">
        <h3 class="text-lg font-bold">Peta Rumah Sakit</h3>
        <img :src="hospitalMap.map_url" alt="Peta Rumah Sakit" class="w-full h-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import DropdownList from '../components/molecules/DropdownList.vue'; // Import DropdownList component
import BedDetail from '../components/molecules/BedDetail.vue'; // Import BedDetail component
import axios from 'axios'; // Import axios for API calls

export default {
  name: 'ListRS',
  components: { DropdownList, BedDetail },
  data() {
    return {
      provinces: [],
      cities: [],
      hospitals: [],
      provinceId: null,
      cityId: null,
      hospitalId: null,
      bedDetail: null, // Menyimpan detail kapasitas kasur
      hospitalMap: null, // Menyimpan data peta rumah sakit
    };
  },
  created() {
    this.fetchProvinces(); // Fetch provinces when the component is created
  },
  methods: {
    async fetchProvinces() {
      try {
        const response = await axios.get('https://rs-bed-covid-api.vercel.app/api/get-provinces');
        this.provinces = response.data.provinces; // Store provinces in the state
      } catch (error) {
        console.error('Error fetching provinces:', error); // Handle error
      }
    },
    async fetchCities() {
      if (!this.provinceId) return; // Return if provinceId is not set
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${this.provinceId}`);
        this.cities = response.data.cities; // Store cities in the state
      } catch (error) {
        console.error('Error fetching cities:', error); // Handle error
      }
    },
    async fetchHospitals() {
      if (!this.provinceId || !this.cityId) return; // Return if either provinceId or cityId is not set
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${this.provinceId}&cityid=${this.cityId}&type=1`);
        this.hospitals = response.data.hospitals; // Store hospitals in the state
      } catch (error) {
        console.error('Error fetching hospitals:', error); // Handle error
      }
    },
    async fetchBedDetail() {
      if (!this.hospitalId) return;
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${this.hospitalId}`);
        console.log(response.data);  // Tambahkan log respons untuk debugging
        this.bedDetail = response.data.data; // Simpan data bed detail sesuai struktur respons API
      } catch (error) {
        console.error('Error fetching bed detail:', error);
      }
    },
    async fetchHospitalMap() {
      if (!this.hospitalId) return;
      try {
        const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-hospital-map?hospitalid=5171133`);
        this.hospitalMap = response.data;
        if (!this.hospitalMap || !this.hospitalMap.map_url) {
          console.error("Hospital map data is unavailable for this hospitalId.");
        }
      } catch (error) {
        console.error("Error fetching hospital map:", error);
        this.hospitalMap = null;
      }
    },
    setProvinceId(id) {
      this.provinceId = id; // Set provinceId
      this.cityId = null; // Reset cityId and hospitalId
      this.hospitalId = null;
      this.fetchCities(); // Fetch cities based on selected province
    },
    setCityId(id) {
      this.cityId = id; // Set cityId
      this.hospitalId = null; // Reset hospitalId
      this.fetchHospitals(); // Fetch hospitals based on selected city
    },
    setHospitalId(id) {
      this.hospitalId = id; // Set hospitalId
      this.fetchBedDetail(); // Fetch bed detail when hospital is selected
      this.fetchHospitalMap(); // Fetch hospital map when hospital is selected
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px; /* Atur lebar maksimum kontainer */
}
</style>
