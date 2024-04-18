<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
      <div class="form-group">
        <label for="name">Tên nhà xuất bản</label>
        <Field name="name" type="text" class="form-control"  v-if="nxbLocal && nxbLocal._id" v-model="nxbLocal.name" />
        <Field name="name" type="text" class="form-control" placeholder=" Nhập tên" v-else  @input="updateContact('name', $event.target.value)" ></Field>
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <Field name="address" type="text" class="form-control"  v-if="nxbLocal && nxbLocal._id" v-model="nxbLocal.address" />
        <Field name="address" type="text" class="form-control" placeholder=" Nhập địa chỉ" v-else  @input="updateContact('address', $event.target.value)" ></Field>

        <ErrorMessage name="address" class="error-feedback" />
      </div>
      <div class="form-group">
        <button class="btn btn-success">Lưu</button>
       
      </div>
    </Form>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  
  export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:nxb","update:nxb"],
    props: {
      nxb: {
        type: Object,
        required: true
      }
    },
    data() {
      const contactFormSchema = yup.object().shape({
        name: yup
          .string()
          .required("Tên là bắt buộc.")
          .required("Tên là bắt buộc.")

          .min(2, "Tên phải có ít nhất 2 ký tự.")
          .max(50, "Tên không được vượt quá 50 ký tự."),
          
        address: yup.string()
        .max(100, "Địa chỉ không được vượt quá 100 ký tự.")
        .required("Địa chỉ là bắt buộc.")
      });
      // console.log(nxb.name);
      return {
        
        nxbLocal:{...this.nxb} ,
        contactFormSchema
      };
    },
    methods: {
      submitContact() {
        if (!this.nxbLocal._id) {
          console.log(this.nxbLocal.data);
          this.$emit("submit:nxb", this.nxbLocal);
        } else {
          this.$emit("update:nxb", this.nxbLocal);
        }
      },
      updateContact(fieldName, value) {
            
            this.nxbLocal[fieldName] = value;
        },
      
    },
 
  };
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  