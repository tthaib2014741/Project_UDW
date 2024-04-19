<template>
    <div class="row">
        <div class="col-sm-4"> </div>

        <form class="col-sm-4" @submit.prevent="login">
            <h4 class="text-center my-2"> Đăng nhập </h4>
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" id="form2Example1" class="form-control" v-model="docgia.username" />
                <label class="form-label" for="form2Example1">Tên Đọc Giả</label>
            </div>


            <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control " v-model="docgia.password" />
                <label class="form-label" for="form2Example2">Mật khẩu</label>
            </div>


            <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger btn-block mb-4">Đăng
                nhập</button>



        </form>
        <p v-if="error">{{ error }}</p>
        <div class="col-sm-4"> </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import DocgiaService from "@/services/docgia.service"

export default {
    data() {
        return {
            docgia: { username: '', password: '' },
            error: '',
        };
    },
    methods: {
        ...mapActions(['setLoggedInUser']),
        async login() {
            try {
                console.log(`Thong tin login userr `);
                console.log(this.docgia );
                const response = await DocgiaService.login(this.docgia);
                console.log("ket qua tra ve");
                console.log(response);
                if (response.status === "success") {
                    console.log("dang nhap user");
                     localStorage.setItem('loggedInUser', JSON.stringify({ username: response.user.TEN, id: response.user._id ,role:"user"}));
                    this.setLoggedInUser({ username: response.user.TEN, id: response.user._id, role: "user" });
                    console.log('loggedInUser:', this.loggedInUser);
                    this.$router.push('/sach');
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
            this.setLoggedInUser(JSON.parse(loggedInUser));
        }
    }
};
</script>

