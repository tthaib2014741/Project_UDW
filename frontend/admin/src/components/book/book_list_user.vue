<template>


    <div class="row">
        <div class="card col-sm-4 col-lg-4" v-for="(book, index) in Books" :key="book._id"
            :class="{ active: index === activeIndex }">
            <div>
                <div class="card-body m-2 p-2">
                    <h5 class="card-title"><strong>{{ book.TENSACH }}</strong></h5>
                    <h6 class="card-subtitle mb-2 text-muted">Tác giả: {{ book.TACGIA }} </h6>
                    <hr>
                    <div class="card-text row">
                        <p class="col-6">Số quyển: {{ book.SOQUYEN }} </p>
                        <p class="col-6">Năm xuất bản: {{ book.NAMXUATBAN }} </p>
                        <p class="col-6">Nhà xuất bản: {{ book.TenNxb }} </p>
                        <p class="col-6">Tác giả: {{ book.DONGIA }} </p>

                    </div>
                    <hr>
                    <a href="#" class="btn btn-outline-danger" @click="muonSach(book._id)">Mượn sách</a>

                </div>
            </div>

        </div>


    </div>

</template>


<script>
import { useRouter } from 'vue-router';
import NxbService from "@/services/nxb.service";
import muonsachService from '@/services/muonsach.service';
import { mapGetters } from "vuex";


export default {

    props: {
        Books: {
            type: Array,
            default: () => []
        }
    },

    async created() {
        for (let i = 0; i < this.Books.length; i++) {
            const book = this.Books[i];
            const maNxb = book.MANXB;

            console.log(maNxb);
            const response = await NxbService.get(maNxb);

            // console.log(response.data);
            book.TenNxb = response.name;
            // console.log(book.TenNxb);
        }// Đảm bảo rằng phương thức getAll() trong service đã được triển khai
    },
    setup() {
        const router = useRouter();

        const editbook = (id) => {
            // Chuyển hướng sang trang chỉnh sửa nhà xuất bản với id tương ứng
            router.push({ name: 'book.edit', params: { id } });
        };

        // const deletebook = (id) => {
        //   emit('deletebook',id);
        // };

        return { editbook, };
    },
    methods: {
        async muonSach(bookId) {
            const router = useRouter();

            const userId = this.loggedInUser.id;
            const data = {
                MASACH: bookId,
                MADOCGIA: userId
            };
            try {
                await muonsachService.create(data);
               
                const confirmViewButton = confirm("Thành công. Xem chi tiết sách đã mượn ");
                if (confirmViewButton) {
                    this.$router.push('/muon-sach');
                }
            } catch (error) {
                console.error("Lỗi khi mượn sách:", error);
                window.alert("Đã xảy ra lỗi khi mượn sách!");
            }
        }
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
};
</script>
