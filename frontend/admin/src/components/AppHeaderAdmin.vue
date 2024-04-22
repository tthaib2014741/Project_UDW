<template>
  <nav class="navbar navbar-expand text-light px-5 bg-gradient-custom ">

    <div class="mr-auto navbar-nav ml-5 px-5">
      <li class="nav-item">
        <router-link :to="{ name: 'nxb' }" class="nav-link text-light">
          <i class="fas fa-address-book"></i> Nhà xuất bản

        </router-link>
      </li>
      <li class="mx-3">
        <router-link :to="{ name: 'sach.admin' }" class="nav-link text-light">
          <i class="fa-solid fa-book" style="color: #ffffff;"></i> Sách

        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'muonsach.admin' }" class="nav-link text-light">
          <i class="fa-solid fa-list" style="color: #ffffff;"></i> Quản lý mượn trả

        </router-link>
      </li>
    </div>

    <div class="navbar-nav ml-auto">
      <li class="nav-item">
        <div v-if="adminLoggedInUser && adminLoggedInUser.role === 'admin'" class="nav-item">
          <div class="d-flex align-items-center text-light">
            Xin chào {{ adminLoggedInUser.username }}
            <button @click="handleLogout" class="btn btn-link nav-link text-light ml-2">
              <i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> Đăng xuất
            </button>
          </div>
        </div>

        <div v-else class="nav-item">
          <router-link :to="{ name: 'login.admin' }" class="nav-link text-light ">
            <i class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> Đăng nhập

          </router-link>
        </div>
      </li>
    </div>
  </nav>
</template>
<style>
.bg-gradient-custom {
  color: white;
  justify-content: center;
  padding: 20px 150px;
  font-size: 18px;
}


</style>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["adminLoggedInUser"]),
  },
  methods: {
    ...mapActions(["logoutAdmin"]),
    handleLogout() {
      this.logoutAdmin();
      // Sau khi đăng xuất, chuyển hướng về trang sách
      this.$router.push({ name: 'login.admin' });
    }
  },
};
</script>
