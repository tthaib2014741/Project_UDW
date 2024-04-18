<template>
     <div v-if="nxb" class="page">
        <h4 class="text-center">Chỉnh sửa thông tin nhà sản xuất</h4>
        <NxbForm :nxb="nxb" @update:nxb="updatenxb"></NxbForm>
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
        props:{
            id:{type: String ,required:true},
        },
        data(){
            return{
                nxb: null,
                message:"",
            };
        },
        methods:{
            async getnxb(id){
                try{
                    // console.log(id);
                    this.nxb = await nxbService.get(id);
                    console.log(this.nxb);
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
        
            async updatenxb(data){
                try{
                    console.log(this.id);
                    await nxbService.update(this.id,data);
                    this.message ="Nhà xuất bản được cập nhật thành công."
                }catch(error){
                    console.log(error);
                }
            },
            async deletenxb(){
                if(confirm("Bạn muốn xóa nhà xuất bản này")){
                    try{
                        await nxbService.delete(this.nxb._id);
                    
                    }catch(error){
                        console.log(error);
                    }
                }
            },
        },
        created() {
                this.getnxb(this.id);
                this.message="";
            },
};
    
</script>