<!-- Header.vue -->
<template>
  <div class="relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-[length:16px_16px]"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column: Text Content -->
          <div class="text-white space-y-6">
            <div class="inline-block">
              <span class="bg-blue-500/30 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full">
                Realtime Updates
              </span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Cek Ketersediaan
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100">
                Tempat Tidur RS
              </span>
            </h1>
            
            <p class="text-xl text-blue-100 max-w-lg">
              Akses informasi ketersediaan tempat tidur rumah sakit untuk layanan COVID-19 dan non-COVID secara realtime
            </p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-6 py-6">
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <div class="text-3xl font-bold text-white">{{ totalProvinsi }}+</div>
                <div class="text-blue-100">Provinsi</div>
              </div>
              <div class="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                <div class="text-3xl font-bold text-white">{{ totalRS }}+</div>
                <div class="text-blue-100">Rumah Sakit</div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 pt-4">
              <button
                @click="handleExplore"
                class="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Cari Rumah Sakit
              </button>
              
              <button
                @click="showInfo"
                class="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          <!-- Right Column: Illustration -->
          <div class="relative lg:block">
            <div class="relative">
              <!-- Hospital Card -->
              <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">Status Tempat Tidur</h3>
                    <p class="text-blue-100">Update Terakhir: {{ getCurrentTime() }}</p>
                  </div>
                </div>
                
                <!-- Bed Status Cards -->
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <div class="bg-white/10 rounded-lg p-3">
                    <div class="text-2xl font-bold text-white">ICU</div>
                    <div class="text-blue-100">Tersedia: 12</div>
                  </div>
                  <div class="bg-white/10 rounded-lg p-3">
                    <div class="text-2xl font-bold text-white">IGD</div>
                    <div class="text-blue-100">Tersedia: 8</div>
                  </div>
                </div>
              </div>

              <!-- Floating Elements -->
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
              <div class="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-300/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      totalProvinsi: 34,
      totalRS: 2500
    }
  },
  methods: {
    handleExplore() {
      this.$emit('explore');
    },
    showInfo() {
      this.$emit('show-info');
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style>
.bg-grid-white {
  background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
}
</style>