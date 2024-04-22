<template>
    <nav class="navbar navbar-expand navbar-dark bg-gradient-custom">
        <a href="/" class="navbar-brand">Thư viện UDW</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'sach.user' }" class="nav-link text-light">
                    Sách
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'muonsach.user' }" class="nav-link text-light">
                    Mượn trả
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>

        <div class="navbar-nav ml-auto">
            <li class="nav-item">
                <div v-if="userLoggedInUser && userLoggedInUser.role === 'user'" class="nav-item">
                    <div class="d-flex align-items-center text-light">
                        Xin chào {{ userLoggedInUser.username }}

                        <button @click="handleLogout" class="btn btn-link nav-link text-light ml-2">
                            <i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> Đăng xuất
                        </button>
                    </div>
                </div>
                <div v-else class="nav-item">
                    <router-link :to="{ name: 'login.user' }" class="nav-link text-light">
                        <i class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> Đăng nhập

                    </router-link>
                </div>
            </li>
        </div>
    </nav>
</template>

<style>
/* Add this CSS to your stylesheet */
.bg-gradient-custom {
    background: linear-gradient(to right, #eb62d6, #0d985e);
    color: white;
    justify-content: center;
    padding: 20px 150px;
    /* Fix padding syntax */
    font-size: 18px;
}
</style>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['userLoggedInUser'])
    },
    methods: {
        ...mapActions(['logoutUser']),
        handleLogout() {
            this.logoutUser();
            // Sau khi đăng xuất, chuyển hướng về trang sách
            this.$router.push({ name: 'sach.user' });
        }
    }
};
</script>