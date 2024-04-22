<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h4 class="text-center my-3">
                Thông tin mượn sách
               
            </h4>
            <DanhSachMuon v-if="DanhSachMuon.length > 0" v-model:activeIndex="activeIndex" :DanhSachMuon="DanhSachMuon"
                @updateDanhSachMuon="updateDanhSachMuon" />
            <p v-else>Không có mượn sách nào.</p>

        </div>



    </div>
</template>

<script>
import DanhSachMuon from "@/components/danh_sach_muon_user.vue";
import MuonSachService from "@/services/muonsach.service";
import { mapGetters } from "vuex";

export default {
    components: {
        DanhSachMuon,
      
    },
    data() {
        return {
            DanhSachMuon: [],
            activeIndex: -1,
            
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        activebook() {
            if (this.activeIndex < 0) return null;
            return this.DanhSachMuon[this.activeIndex];
        },
        ...mapGetters(["userLoggedInUser"]),
    },
    methods: {
        async retrievebooks() {
            try {
                this.DanhSachMuon = await MuonSachService.get(this.userLoggedInUser.id);
                console.log(this.DanhSachMuon);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievebooks();
        },
        updateDanhSachMuon(danhSachMuon) {
            this.DanhSachMuon = danhSachMuon;
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
    max-width: 950px;
}
</style>