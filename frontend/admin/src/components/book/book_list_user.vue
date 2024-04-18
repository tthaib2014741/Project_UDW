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
                    <a href="#" class="btn btn-outline-danger">Mượn sách</a>

                </div>
            </div>

        </div>


    </div>

</template>


<script>
import { useRouter } from 'vue-router';
import NxbService from "@/services/nxb.service";


export default {
    emits: ["delete:book"],
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
        deletebook(id) {
            console.log(id);
            this.$emit("deletebook", id);

        },
    },
};
</script>
