<template>
    <div v-if="Book" class="page">
       <h4 class="text-center">Chỉnh sửa thông tin sách</h4>
       <BookForm :Book="Book" @update:Book="updateBook"></BookForm>
       <p class="text-success">{{ message }}</p>
   </div>
</template>
<script>
   import BookForm from "@/components/book/BookForm.vue";
   import BookService from "@/services/book.service";
   export default {
       components: {
           BookForm,
       },
       props:{
           id:{type: String ,required:true},
       },
       data(){
           return{
               Book: null,
               message:"",
           };
       },
       methods:{
           async getBook(id){
               try{
                   console.log("id sach lay",id);
                   this.Book = await BookService.get(id);
                   console.log(this.Book);
               }catch(error){
                   console.log(error);
                   this.$router.push({
                       name:"notfound",
                       params:{
                           pathMatch:this.$route.path.split("/").slice(1)
                       },
                       query:this.$route.query,
                       hash:this.$route.hash,
                   })
               }
           },
       
           async updateBook(data){
               try{
                   console.log(this.id);
                   await BookService.update(this.id,data);
                   this.message ="Cập nhật thành công."
               }catch(error){
                   console.log(error);
               }
           },
           async deleteBook(){
               if(confirm("Bạn muốn xóa nhà xuất bản này")){
                   try{
                       await BookService.delete(this.Book._id);
                   
                   }catch(error){
                       console.log(error);
                   }
               }
           },
       },
       created() {
               this.getBook(this.id);
               this.message="";
           },
};
   
</script>