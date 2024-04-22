<template>
  <!-- <div>
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
  </div> -->


  <!-- Section: Design Block -->
  <section class="">
    <!-- Jumbotron -->
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h3 class="my-5 display-3 fw-bold ls-tight">
              <span class="text-primary">Chào mừng đến với trang quản lý thư viện</span>
            </h3>

          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
              <div class="card-body py-5 px-md-5">
                <form @submit.prevent="login">
                    <h4 class="text-center"> Đăng nhập</h4>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="form3Example3" class="form-control" v-model="nhanvien.username" placeholder="Email" />
                    <!-- <label class="form-label" for="form3Example3">Name</label> -->
                  </div>


                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form3Example4" class="form-control" v-model="nhanvien.password"  placeholder="Password"/>
                    <!-- <label class=" form-label" for="form3Example4">Password</label> -->
                  </div>




                  <button type="submit" data-mdb-button-init data-mdb-ripple-init
                    class="btn btn-primary btn-block mb-4">
                    Đăng nhập
                  </button>
                  <p v-if="error">{{ error }}</p>


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

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
    ...mapActions(['setAdminLoggedInUser']),
    async login() {
      try {
        const response = await nhanvienService.login(this.nhanvien);
        if (response.status === "success") {
          console.log('response:', response);

          localStorage.setItem('adminLoggedInUser', JSON.stringify({ username: response.user.HOTENNV, id: response.user._id ,role:"admin"}));
          this.setAdminLoggedInUser({ username: response.user.HOTENNV, id: response.user._id, role: "admin" });
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
    const adminLoggedInUser = localStorage.getItem('adminLoggedInUser');
    if (adminLoggedInUser) {
      // Đăng nhập với thông tin đăng nhập của admin
      this.setAdminLoggedInUser(JSON.parse(adminLoggedInUser));
    }
  }
};
</script>
