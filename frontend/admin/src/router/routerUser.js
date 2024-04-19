import { createWebHistory, createRouter } from "vue-router";
// import Vue from 'vue';
// import VueRouter from 'vue-router';
import AdminBook from "@/views/admin/AdminBook.vue";
// import { isAuthenticated } from "@/services/nhanvien.service";
const routes = [
   
   


    //user
    // {
    //     path: "/",
    //     name: "index.user",
    //     component: () => import("@/views/user/trangchu.vue"),
    // },
    {
        path: "/sach",
        name: "sach.user",
        component: () => import("@/views/user/book/book.vue"),
    },
    {
        path: "/muon-sach",
        name: "muonsach",
        component: () => import("@/views/user/muonsach.vue"),
    },
    {
        path: "/login",
        name: "login.user",
        component: () => import("@/views/user/login.vue"),
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
     
    
 
        

];
    




        const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    })
export default router;