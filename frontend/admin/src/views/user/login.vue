<template>
    <div class="row" >
        <div class="col-sm-4"> </div>

        <form class="col-sm-4"> 
           <h4 class="text-center my-2"> Đăng nhập </h4>
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="form2Example1" class="form-control" />
                <label class="form-label" for="form2Example1">Email address</label>
            </div>

           
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

           
            <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger btn-block mb-4">Đăng
                nhập</button>

          

        </form>
        <div class="col-sm-4"> </div>
    </div>
</template>
<!-- 
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
                    this.setLoggedInUser({ username: response.user.username, id: response.user.id });
                    this.$router.push('/quanly');
                } else {
                    this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác.';
                }
            } catch (error) {
                this.error = 'Đăng nhập không thành công. Vui lòng thử lại.';
            }
        }
    }
};
</script> -->
