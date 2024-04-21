<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
      <div class="form-group">
        <label for="TENSACH">Tên sách</label>
        <Field name="TENSACH" type="text" class="form-control" v-if="BookLocal && BookLocal._id" v-model="BookLocal.TENSACH" />
        <Field name="TENSACH" type="text" class="form-control" placeholder=" Nhập tên" v-else @input="updateContact('TENSACH', $event.target.value)" ></Field>
        <ErrorMessage name="TENSACH" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="DONGIA">Đơn giá</label>
        <Field name="DONGIA" type="text" class="form-control" v-if="BookLocal && BookLocal._id" v-model="BookLocal.DONGIA" />
        <Field name="DONGIA" type="text" class="form-control" placeholder=" Nhập đơn giá" v-else @input="updateContact('DONGIA', $event.target.value)" ></Field>
        <ErrorMessage name="DONGIA" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="SOQUYEN">Số quyển</label>
        <Field name="SOQUYEN" type="text" class="form-control" v-if="BookLocal && BookLocal._id" v-model="BookLocal.SOQUYEN" />
        <Field name="SOQUYEN" type="text" class="form-control" placeholder=" Nhập số quyển" v-else @input="updateContact('SOQUYEN', $event.target.value)" ></Field>
        <ErrorMessage name="SOQUYEN" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="NAMXUATBAN">Năm xuất bản</label>
        <Field name="NAMXUATBAN" type="text" class="form-control" v-if="BookLocal && BookLocal._id" v-model="BookLocal.NAMXUATBAN" />
        <Field name="NAMXUATBAN" type="text" class="form-control" placeholder=" Nhập năm xuất bản" v-else @input="updateContact('NAMXUATBAN', $event.target.value)" ></Field>
        <ErrorMessage name="NAMXUATBAN" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="MANXB">Chọn nhà xuất bản</label>
        <select name="MANXB" v-model="BookLocal.MANXB"   class="form-control" :placeholder="'Chọn nhà xuất bản'">
          <option disabled selected value="Chọn nhà xuất bản" v-if="!BookLocal._id"> Chọn nhà xuất bản</option> 
          <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">{{ publisher.name }}</option>
        </select>
        <ErrorMessage name="MANXB" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="TACGIA">Tác giả</label>
        <Field name="TACGIA" type="text" class="form-control" v-if="BookLocal && BookLocal._id" v-model="BookLocal.TACGIA" />
        <Field name="TACGIA" type="text" class="form-control" placeholder="Tác giả" v-else @input="updateContact('TACGIA', $event.target.value)" ></Field>
        <ErrorMessage name="TACGIA" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-success">Lưu</button>
      </div>
    </Form>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
import NxbService from "@/services/nxb.service";
  
  export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:Book","update:Book"],
    props: {
      Book: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        BookLocal: { ...this.Book },
        contactFormSchema: yup.object().shape({
          TENSACH: yup.string().required("Tên là bắt buộc.").min(2, "Tên phải có ít nhất 2 ký tự.").max(50, "Tên không được vượt quá 50 ký tự."),
      
        }),
        publishers: [] // Danh sách nhà xuất bản
      };
    },
    async created() {
   
      this.publishers = await NxbService.getAll(); 
      console.log(this.publishers.data);
    },
    methods: {
      submitContact() {
        if (!this.BookLocal._id) {
          console.log(this.BookLocal.data);
          this.$emit("submit:Book", this.BookLocal);
        } else {
          this.$emit("update:Book", this.BookLocal);
        }
      },
      updateContact(fieldName, value) {
        this.BookLocal[fieldName] = value;
      }
    }
  };
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  