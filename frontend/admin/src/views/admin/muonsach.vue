<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <h3 class="text-center my-3 text-primary">
                Thông tin mượn sách
            </h3>
            <DanhSachMuon v-if="DanhSachMuon.length > 0" v-model:activeIndex="activeIndex" :DanhSachMuon="DanhSachMuon"
                @updateDanhSachMuon="updateDanhSachMuon" />
            <p v-else>Không có mượn sách nào.</p>
        </div>
    </div>
</template>

<script>
import DanhSachMuon from "@/components/danh_sach_muon_sach.vue";
import InputSearch from "@/components/book/Input_Search.vue";
import MuonSachService from "@/services/muonsach.service";

export default {
    components: {
        DanhSachMuon,
        InputSearch,
    },
    data() {
        return {
            DanhSachMuon: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        }
    },
    methods: {
        async retrievebooks() {
            try {
                this.DanhSachMuon = await MuonSachService.getAll();
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
