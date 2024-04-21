<template>
    <div  class="page">
       <h4 class="text-center">Thêm nhà sản xuất</h4>
       <NxbForm :nxb="nxb" @submit:nxb="addnxb"></NxbForm>
       <p class="text-success">{{ message }}</p>
   </div>
</template>
<script>
   import NxbForm from "@/components/nxb/NxbForm.vue";
   import nxbService from "@/services/nxb.service";
   export default {
       components: {
           NxbForm,
       },
       props: {
            id: {
                type: String,
                
            },
        },
       data(){
           return{
               nxb: null,
               message:"",
           };
       },
       methods:{
          
       
           async addnxb(data){
               try{
                   
                   await nxbService.create(data);
                   this.message ="Nhà xuất bản được thêm thành công thành công."
               }catch(error){
                   console.log(error);
               }
           },
           
       },
      
};
   
</script>