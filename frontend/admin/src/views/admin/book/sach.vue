<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h4 class="text-center my-3">
                Sách trong thư viện<i class="fas fa-address-book"></i>
                <div>
                    <InputSearch v-model="searchText" />
                </div>
            </h4>
            <BookList v-if="Books.length > 0" :Books="filteredBooks" @deletebook="deletebook"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có nhà xuất bản nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">

                <router-link :to="{ name: 'book.add' }">
                    <button class="btn btn-sm btn-success">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>

            </div>
        </div>



    </div>
</template>

<script>
import BookList from "@/components/book/List.vue";
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
            searchText:"",
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
                return [ TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, TenNxb, TACGIA ].join("");
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
        async deletebook(id) {
       if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await BookService.delete(id);
          // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
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