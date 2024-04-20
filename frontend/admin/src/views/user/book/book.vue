<template>
    <div class="">

        <div class="mt-2 col-md-12">
            <h4 class="text-center my-4">
                Sách trong thư viện
            </h4>
            <div class="my-2 px-5 mx-5 ">
                <InputSearch v-model="searchText" />
            </div>
            <BookList v-if="Books.length > 0" :Books="filteredBooks" @deletebook="deletebook"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có sách nào.</p>

        </div>



    </div>
</template>

<script>
import BookList from "@/components/book/book_list_user.vue";
import InputSearch from "@/components/book/Input_Search.vue";

import BookService from "@/services/book.service";

export default {
    components: {
        BookList,
        InputSearch,
    },
    data() {
        return {
            Books: [],
            activeIndex: -1,
            searchText: "",
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
            return this.Books[this.activeIndex];
        },
        bookString() {
            return this.Books.map((book) => {
                const { TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, TenNxb, TACGIA } = book;
                return [TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, TenNxb, TACGIA].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.Books;
            return this.Books.filter((_book, index) =>
                this.bookString[index].includes(this.searchText)
            );
        },
    },
    methods: {
       
        async retrievebooks() {
            try {
                this.Books = await BookService.getAll();
                console.log(this.Books);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievebooks();
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