<template>
    <table class="table">
        <thead>
            <tr>
                <th>STT</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Tên đọc giả</th>
                <th scope="col">Ngay mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(muonsach, index) in DanhSachMuon" :key="muonsach._id"
                :class="{ active: index === activeIndex }">
                <td>{{ index + 1 }}</td>

                <td>{{ muonsach.tensach }}</td>
                <td>{{ muonsach.TENDOCGIA }}</td>
                <td>{{ muonsach.NGAYMUON }}</td>
                <td>{{ muonsach.NGAYTRA }}</td>
                <td>
                    <template v-if="muonsach.TRANGTHAI === 0">
                        <button @click="Duyetmuon(muonsach._id)" class="btn btn-success">Duyệt</button>
                    </template>
                    <template v-else-if="muonsach.TRANGTHAI === 1 && muonsach.NGAYTRA == null">
                        Đang mượn
                        <button @click="TraSach(muonsach._id)" class="btn btn-primary">Trả sách</button>
                    </template>
                    <template v-else>
                        <p>Đã trả sách</p>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import bookService from "@/services/book.service";
import MuonSachService from "@/services/muonsach.service";

export default {
    props: {
        DanhSachMuon: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        async Duyetmuon(muonsachId) {
            try {
                await MuonSachService.duyet(muonsachId);
                this.$emit('updateDanhSachMuon', await MuonSachService.getAll());
            } catch (error) {
                console.error("Lỗi khi duyệt mượn sách:", error);
            }
        },
        async TraSach(muonsachId) {
            try {
                await MuonSachService.tra(muonsachId);
                this.$emit('updateDanhSachMuon', await MuonSachService.getAll());
            } catch (error) {
                console.error("Lỗi khi trả sách:", error);
            }
        },
        async fetchBookDetails() {
            for (let i = 0; i < this.DanhSachMuon.length; i++) {
                const muonsach = this.DanhSachMuon[i];
                const masach = muonsach.MASACH;
                const madocgia = muonsach.MADOCGIA;
                console.log("muonsach::::::", masach, madocgia)
                const response = await bookService.get(masach);
                console.log("du lieu tu serrvee::::::");
                console.log(response);
                
                const responseDOCGIA = await MuonSachService.getDocgia(madocgia);
                

                muonsach.tensach = response.TENSACH;
                console.log(masach.tensach);
                muonsach.TENDOCGIA = responseDOCGIA.TEN;
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
