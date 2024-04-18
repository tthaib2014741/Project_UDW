import { createWebHistory, createRouter } from "vue-router";
// import Vue from 'vue';
// import VueRouter from 'vue-router';
import AdminBook from "@/views/admin/AdminBook.vue";
// import { isAuthenticated } from "@/services/nhanvien.service";
const routes = [
    {
        path: "/quanly/login",
        name: "login.admin",
        component: () => import("@/views/admin/login.vue"),
    },

    {
        path: "/quanly",
        name: "index",
        component: AdminBook,
        meta: { requiresAuth: true }

    },
    {
        path: "/quanly/nxb",
        name: "nxb",
        component: () => import("@/views/admin/nxb/nxb.vue"),
        meta: { requiresAuth: true }


    },
    {
        path: "/quanly/chinh-sua-nha-xuat-ban/:id",
        name: "editNxb",
        component: () => import("@/views/admin/nxb/editnxb.vue"),
        props: true,
        meta: { requiresAuth: true }
        

    },
    {
        path: "/quanly/them-nha-xuat-ban",
        name: "nxb.add",
        component: () => import("@/views/admin/nxb/add_nxb.vue"),
        props: true,
        meta: { requiresAuth: true }

        

    },
    {
        path: "/quanly/sach",
        name: "sach.admin",
        component: () => import("@/views/admin/book/sach.vue"),
        meta: { requiresAuth: true }


    },
    {
        path: "/quanly/chinh-sua-sach/:id",
        name: "book.edit",
        component: () => import("@/views/admin/book/edit_book.vue"),
        props: true,
        meta: { requiresAuth: true }
        

    },
    {
        path: "/quanly/them-sach",
        name: "book.add",
        component: () => import("@/views/admin/book/add_book.vue"),
        props: true,
        meta: { requiresAuth: true }
        
        

    },

    {
        path: "/quanly/muonsach",
        name: "muonsach.admin",
        component: () => import("@/views/user/muonsach.vue"),
        meta: { requiresAuth: true }


    },
   




    //user
    {
        path: "/",
        name: "index.user",
        component: () => import("@/views/user/trangchu.vue"),
    },
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
    


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // Kiểm tra nếu người dùng đã đăng nhập
//     if (!isAuthenticated()) {
//       // Nếu chưa đăng nhập, chuyển hướng tới trang đăng nhập
//       next({ name: 'login.admin' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

        const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    })
export default router;