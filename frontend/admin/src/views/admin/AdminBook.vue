<template>
    <div>
    
      <div>
        <div v-if="loggedInUser">
         <p class="text-light mt-2 ml-auto"> Chào mừng quản lý <b>{{ loggedInUser.username }}</b> đến với trang quản lý mượn sách </p>
        </div>
        <h6>.</h6>
      </div>
    </div>
  </template>
  
  <script>
  import NxbList from "@/components/nxb/NxbList.vue";
  import NxbService from "@/services/nxb.service";
  import { mapGetters } from 'vuex';
  export default {
    components: {
      NxbList,
    },
    data() {
      return {
        nxbs: [],
        activeIndex: -1,
        isAdminPage: false, // Thêm biến để kiểm tra trang admin
      };
    },
    computed: {
      ...mapGetters(['loggedInUser']),
      activeNxb() {
        if (this.activeIndex < 0) return null;
        return this.nxbs[this.activeIndex];
      },
    },
    methods: {
      async retrieveNxbs() {
        try {
          this.nxbs = await NxbService.getAll();
          console.log(this.nxbs);
        } catch (error) {
          console.log(error);
        }
      },
      refreshList() {
        this.retrieveNxbs();
        this.activeIndex = -1;
      },
      async removeAllNxbs() {
        if (confirm("Bạn muốn xóa tất cả Nhà xuất bản?")) {
          try {
            await NxbService.deleteAll();
            this.refreshList();
          } catch (error) {
            console.log(error);
          }
        }
      },
    },
    mounted() {
      // Kiểm tra nếu đường dẫn là '/admin' thì hiển thị trang admin, ngược lại hiển thị trang index
      if (this.$route.path === '/admin') {
        this.isAdminPage = true;
      }
      this.refreshList();
    },
  };
  </script>
  
  <style scoped>
  .page {
    text-align: left;
    max-width: 750px;
  }
  </style>
  