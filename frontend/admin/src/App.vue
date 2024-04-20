<script>
import { computed } from 'vue';
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue"; // Header cho admin
import AppHeaderUser from "@/components/AppHeaderUser.vue"; // Header cho user

export default {
  components: {
    AppHeaderAdmin,
    AppHeaderUser
  },
  setup() {
    // Tạo computed property để kiểm tra URL
    const isAdminRoute = computed(() => {
      return window.location.pathname.includes("/quanly");
    });

    return { isAdminRoute };
  }
};
</script>

<template>
  <div id="app">
    <!-- Sử dụng conditional rendering để chọn header phù hợp -->
    <component :is="isAdminRoute ? 'AppHeaderAdmin' : 'AppHeaderUser'" />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
  
}
body{
  font-family: Roboto;
}
</style>
