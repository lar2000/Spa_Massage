<script setup>
import { ref, watch } from 'vue';
import Login from './components/Login.vue';
import Header from './Layout/Header.vue';
import Navbar from './Layout/Navbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const path = ref(route.path);
watch(
  () => route.path,
  (newPath) => {
    path.value = newPath;
  }
);
</script>

<template>
  <Login v-if="path === '/login'" />
    <div v-else id="app" class="app app-header-fixed app-sidebar-fixed">
        <Header />
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<style scoped>

</style>
