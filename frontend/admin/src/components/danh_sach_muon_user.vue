<template>
    <table class="table">
        <thead>
            <tr>
                <th>STT</th>
                <th scope="col">Tên sách</th>
            
                <th scope="col">Ngay mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(muonsach, index) in DanhSachMuon" :key="muonsach._id"
                :class="{ active: index === activeIndex }">
                <td>{{ index + 1 }}</td>
                <td>{{ muonsach.TENSACH }}</td>
                <td>{{ muonsach.NGAYMUON }}</td>
                <td>{{ muonsach.NGAYTRA }}</td>
                <td>
                    <template v-if="muonsach.TRANGTHAI === 0">
                        Đang chờ duyệt
                        <button @click="HuyMuon(muonsach._id)" class="btn btn-danger">Hủy mượn</button>
                    </template>
                    <template v-else-if="muonsach.TRANGTHAI === 1 && !muonsach.NGAYTRA">
                        Đang mượn
                    </template>
                    <template v-else>
                        Đã trả sách
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

import bookService from "@/services/book.service";
import MuonSachService from "@/services/muonsach.service";
import { mapGetters } from "vuex";

export default {
    props: {
        DanhSachMuon: {
            type: Array,
            default: () => []
        }
    },
    async created() {
        await this.fetchBookDetails();
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
    methods: {
        async fetchBookDetails() {
            for (let i = 0; i < this.DanhSachMuon.length; i++) {
                const muonsach = this.DanhSachMuon[i];
                const masach = muonsach.MASACH;
                const madocgia = muonsach.MADOCGIA;
                const response = await bookService.get(masach);
                const responseDOCGIA = await MuonSachService.getDocgia(madocgia);

                muonsach.TENSACH = response.TENSACH;
                muonsach.TENDOCGIA = responseDOCGIA.TEN;
            }
        },
        async HuyMuon(muonsachId) {
            try {
                await MuonSachService.huyMuonSach(muonsachId);
                // Cập nhật lại danh sách mượn sau khi hủy mượn
                this.$emit('updateDanhSachMuon', await MuonSachService.get(this.loggedInUser.id));
            } catch (error) {
                console.error("Lỗi khi hủy mượn sách:", error);
            }
        }
    },
    mounted() {
        // Gọi fetchBookDetails khi component được tạo ra
        this.fetchBookDetails();
    },
    watch: {
        // Watch for changes in props.DanhSachMuon
        DanhSachMuon: {
            handler: 'fetchBookDetails', // Call fetchBookDetails when props.DanhSachMuon changes
            deep: true // Watch changes deeply in props.DanhSachMuon
        }
    }
};
</script>
