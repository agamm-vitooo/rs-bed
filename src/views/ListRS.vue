<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100">
        <h1 class="text-2xl font-bold text-center text-gray-900">
          Cek Ketersediaan Tempat Tidur
        </h1>
      </div>

      <!-- Selection Area -->
      <div class="p-6 space-y-4">
        <div class="grid gap-4 text-black">
          <!-- Province Dropdown -->
          <div>
            <DropdownList
              :items="provinces"
              placeholder="Pilih Provinsi"
              class="w-full"
              @select="handleProvinceSelect"
            />
          </div>

          <!-- City Dropdown -->
          <div v-if="provinceId">
            <DropdownList
              :items="cities"
              placeholder="Pilih Kota"
              class="w-full"
              @select="handleCitySelect"
            />
          </div>

          <!-- Hospital Dropdown -->
          <div v-if="provinceId && cityId">
            <DropdownList
              :items="hospitals"
              placeholder="Pilih Rumah Sakit"
              class="w-full"
              @select="handleHospitalSelect"
            />
          </div>
        </div>

        <!-- Hospital Details -->
        <div v-if="hospitalId && bedDetail" class="mt-8 space-y-6">
          <!-- Hospital Info Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div class="flex items-center gap-3">
              <i class="fas fa-hospital text-blue-500"></i>
              <span class="font-medium">{{ bedDetail.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <i class="fas fa-map-marker-alt text-blue-500"></i>
              <span class="text-gray-600">{{ bedDetail.address }}</span>
            </div>
            <div class="flex items-center gap-3">
              <i class="fas fa-phone text-blue-500"></i>
              <span class="text-gray-600">{{ bedDetail.phone }}</span>
            </div>
          </div>

          <!-- Bed Availability Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Available Beds -->
            <div class="bg-green-50 rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <i class="fas fa-bed text-green-600"></i>
                  <span class="font-medium text-green-900">Tersedia</span>
                </div>
                <span class="text-2xl font-bold text-green-600">
                  {{ bedDetail.bed_empty }}
                </span>
              </div>
            </div>

            <!-- Total Beds -->
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <i class="fas fa-bed text-blue-600"></i>
                  <span class="font-medium text-blue-900">Total</span>
                </div>
                <span class="text-2xl font-bold text-blue-600">
                  {{ bedDetail.bed_availability }}
                </span>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div v-if="hospitalMap" class="bg-white rounded-lg border border-gray-200 p-6 text-black">
            <h3 class="text-lg font-semibold mb-4">Lokasi Rumah Sakit</h3>
            <img 
              :src="hospitalMap.map_url" 
              alt="Peta Rumah Sakit" 
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DropdownList from '../components/molecules/DropdownList.vue';

export default {
  name: 'HospitalFinder',
  components: {
    DropdownList,
  },
  data() {
    return {
      provinces: [],
      cities: [],
      hospitals: [],
      provinceId: null,
      cityId: null,
      hospitalId: null,
      bedDetail: null,
      hospitalMap: null,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchProvinces();
  },
  methods: {
    // Fetch Data Methods
    async fetchProvinces() {
      this.loading = true;
      try {
        const { data } = await axios.get('https://rs-bed-covid-api.vercel.app/api/get-provinces');
        this.provinces = data.provinces;
      } catch (error) {
        this.error = 'Gagal memuat data provinsi';
        console.error('Error fetching provinces:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCities() {
      if (!this.provinceId) return;
      this.loading = true;
      try {
        const { data } = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-cities`, {
          params: { provinceid: this.provinceId }
        });
        this.cities = data.cities;
      } catch (error) {
        this.error = 'Gagal memuat data kota';
        console.error('Error fetching cities:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchHospitals() {
      if (!this.provinceId || !this.cityId) return;
      this.loading = true;
      try {
        const { data } = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-hospitals`, {
          params: {
            provinceid: this.provinceId,
            cityid: this.cityId,
            type: 1
          }
        });
        this.hospitals = data.hospitals;
      } catch (error) {
        this.error = 'Gagal memuat data rumah sakit';
        console.error('Error fetching hospitals:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchHospitalDetails() {
      if (!this.hospitalId) return;
      this.loading = true;
      try {
        const [bedResponse, mapResponse] = await Promise.all([
          axios.get(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail`, {
            params: { hospitalid: this.hospitalId, type: 1 }
          }),
          axios.get(`https://rs-bed-covid-api.vercel.app/api/get-hospital-map`, {
            params: { hospitalid: this.hospitalId }
          })
        ]);
        
        this.bedDetail = bedResponse.data;
        this.hospitalMap = mapResponse.data;
      } catch (error) {
        this.error = 'Gagal memuat detail rumah sakit';
        console.error('Error fetching hospital details:', error);
      } finally {
        this.loading = false;
      }
    },

    // Event Handlers
    handleProvinceSelect(id) {
      this.provinceId = id;
      this.cityId = null;
      this.hospitalId = null;
      this.bedDetail = null;
      this.hospitalMap = null;
      this.fetchCities();
    },

    handleCitySelect(id) {
      this.cityId = id;
      this.hospitalId = null;
      this.bedDetail = null;
      this.hospitalMap = null;
      this.fetchHospitals();
    },

    handleHospitalSelect(id) {
      this.hospitalId = id;
      this.fetchHospitalDetails();
    },
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Additional custom styles can be added here if needed */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>