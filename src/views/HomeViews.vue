<!-- HomeView.vue -->
<template>
  <div>
    <Header @explore="$emit('explore')" />
  </div>
</template>

<script>
import Header from '../components/organism/Header.vue';

export default {
  name: 'HomeView',
  components: {
    Header
  }
};
</script>
