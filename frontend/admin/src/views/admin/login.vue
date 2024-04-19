<template>
  <div>
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" v-model="nhanvien.username">
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" autocomplete="current-password" v-model="nhanvien.password">
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import nhanvienService from "@/services/nhanvien.service"

export default {
  data() {
    return {
      nhanvien: { username: '', password: '' },
      error: '',
    };
  },
  methods: {
    ...mapActions(['setLoggedInUser']),
    async login() {
      try {
        const response = await nhanvienService.login(this.nhanvien);
        if (response.status === "success") {
          console.log('response:', response);

          localStorage.setItem('loggedInUser', JSON.stringify({ username: response.user.HOTENNV, id: response.user._id ,role:"admin"}));
          this.setLoggedInUser({ username: response.user.HOTENNV, id: response.user._id, role: "admin" });
      //  console.log('loggedInUser:',loggedInUser.role);
          
          this.$router.push('/quanly');
        } else {
          this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
        }
      } catch (error) {
        this.error = 'Đăng nhập không thành công. Vui lòng thử lại.';
      }
    }
  },
  created() {
    // Kiểm tra nếu có thông tin đăng nhập trong local storage khi component được tạo
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.$store.dispatch('setLoggedInUser', JSON.parse(loggedInUser));
    }
  }
};
</script>
