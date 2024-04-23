<template>
    <div class="page row">

        <div class="mt-3 col-md-12">
            <h3 class="text-center my-3 text-primary">
                Sách trong thư viện

            </h3>
            <div class="my-3 row justify-content-around align-items-center">

                <router-link :to="{ name: 'book.add' }" class="px-5 col-sm-3">
                    <button class="btn btn-sm btn-success ">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>
                <div class="col-sm-9 px-5">
                    <InputSearch v-model="searchText" />
                </div>
            </div>
            <BookList v-if="Books.length > 0" :Books="filteredBooks" @deletebook="deletebook"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có sách nào trong thư viện.</p>

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
       if (confirm("Bạn muốn xóa sách này?")) {
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