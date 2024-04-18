<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h4 class="text-center my-3">
                Nhà xuất bản<i class="fas fa-address-book"></i>
            </h4>
            <NxbList v-if="nxbs.length > 0" :nxbs="nxbs"  @deleteNxb="deleteNxb" v-model:activeIndex="activeIndex" />
            <p v-else>Không có nhà xuất bản nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">

                <router-link :to="{ name: 'nxb.add' }">
                    <button class="btn btn-sm btn-success">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>

            </div>
        </div>



    </div>
</template>

<script>
import NxbList from "@/components/nxb/NxbList.vue";
import NxbService from "@/services/nxb.service";

export default {
    components: {
        NxbList,
    },
    data() {
        return {
            nxbs: [],
            activeIndex: -1,
        };
    },
    computed: {
        activeNxb() {
            if (this.activeIndex < 0) return null;
            return this.nxbs[this.activeIndex];
        },
    },
    methods: {
        async deleteNxb(id) {
       if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await NxbService.delete(id);
          // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
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
    }
       
       
    },
    mounted() {
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