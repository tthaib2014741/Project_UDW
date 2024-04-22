<template>
  <table class="table">
    <thead>
      <tr>
        <th>STT</th>
        <th scope="col-4">Tên</th>
        <th scope="col-4">Địa chỉ</th>
        <th scope="col-4">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(nxb, index) in nxbs" :key="nxb._id" :class="{ active: index === activeIndex }">
        <td>{{ index + 1 }}</td>

        <td>{{ nxb.name }}</td>
        <td>{{ nxb.address }}</td>
        <td>
          <router-link :to="{
              name:'editNxb',
              params:{id:nxb._id},
            }">
            <button class="mx-1 btn-sm btn-warning"> Sửa</button>
          </router-link>
          <button class="btn btn-sm btn-danger" @click="deleteNxb(nxb._id)">Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
 


  
  <script>
import { useRouter } from 'vue-router';
import NxbService from "@/services/nxb.service";

export default {
  emits: ["delete:nxb"],
  props: {
    nxbs: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const router = useRouter();

    const editNxb = (id) => {

      router.push({ name: 'editNxb', params: { id } });
    };



    return { editNxb,  };
  },
  methods: {
    deleteNxb(id) {
          console.log(id);
          this.$emit("deleteNxb",id);
       
      },
  },
};
</script>
