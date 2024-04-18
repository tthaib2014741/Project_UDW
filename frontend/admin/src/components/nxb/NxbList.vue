<template>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nxb, index) in nxbs" :key="nxb._id"
            :class="{ active: index === activeIndex }" >
          <td>{{ nxb.name }}</td>
          <td>{{ nxb.address }}</td>
          <td>
            <router-link :to="{
              name:'editNxb',
              params:{id:nxb._id},
            }">
              <button class="mx-1 btn-sm btn-warning"> sửa</button>
            </router-link>
            <button class="btn btn-sm btn-danger" @click="deleteNxb(nxb._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <!-- Trong file NxbList.vue -->


  
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
      // Chuyển hướng sang trang chỉnh sửa nhà xuất bản với id tương ứng
      router.push({ name: 'editNxb', params: { id } });
    };

    // const deleteNxb = (id) => {
    //   emit('deleteNxb',id);
    // };

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
