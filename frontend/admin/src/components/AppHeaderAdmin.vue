<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <!-- <a href="/quanly" class="navbar-brand">Ứng dụng Quản lý mượn sách</a> -->
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'nxb' }" class="nav-link">
          Nhà xuất bản
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name:'sach.admin'}" class="nav-link">
          Sách
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name:'muonsach.admin'}" class="nav-link">
          Quản lý mượn tra
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
        <li v-if="loggedInUser && loggedInUser.role === 'admin'">

        <p class="text-light mt-2 ml-auto"> Xin chào {{ loggedInUser.username }}  {{ loggedInUser.id }}  {{ loggedInUser.role }}</p>
     
        <li class="nav-item">
          <button @click="logout" class="btn btn-link nav-link">Đăng xuất</button>
        </li>
     
      </li>
      <li v-else>
        <router-link :to="{name:'login.admin'}" class="nav-link">
          Đăng nhập
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    ...mapActions(['logout'])
  }
};

</script>