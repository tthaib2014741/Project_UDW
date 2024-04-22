<template>
  <div>

    <div>
      <div v-if="adminLoggedInUser">
        <h2 class="text-primary text-center mt-3 pt-3"> Chào mừng quản lý <b>{{ adminLoggedInUser.username }}</b> đến
          với
          trang quản lý mượn sách </h2>
      </div>

    </div>
  </div>
</template>
  
 
  
  <style scoped>
  .page {
    text-align: left;
    max-width: 750px;
  }
  </style>
  <script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["adminLoggedInUser"]),
    },
  
  };
  </script>