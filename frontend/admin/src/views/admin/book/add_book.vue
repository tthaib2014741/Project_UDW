<template>
    <div  class="page">
       <h4 class="text-center">Thêm sách</h4>
       <BookForm :Book="Book" @submit:Book="addBook"></BookForm>
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
       props: {
            id: {
                type: String,
                
            },
        },
       data(){
           return{
               Book: null,
               message:"",
           };
       },
       methods:{
          
       
           async addBook(data){
               try{
                //    console.log(this.id);
                   await BookService.create(data);
                   this.message ="Thêm thành công."
               }catch(error){
                   console.log(error);
               }
           },
          
       },
      
};
   
</script>