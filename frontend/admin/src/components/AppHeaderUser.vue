<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Thư viện UDW</a>
        <div class="mr-auto navbar-nav">
           
            <li>
                <router-link :to="{ name: 'sach.user' }" class="nav-link">
                    Sách
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'muonsach.user' }" class="nav-link">
                    Mượn trả
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
           <li v-if="loggedInUser && loggedInUser.role === 'user'">

                <p class="text-light mt-2 ml-auto"> Xin chào {{ loggedInUser.username }}</p>
            <li>
            <li class="nav-item">
                <button @click="logout" class="btn btn-link nav-link">Đăng xuất</button>
            </li>
            </li>
            </li>
            <li v-else>
                <router-link :to="{ name: 'login.user' }" class="nav-link">
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