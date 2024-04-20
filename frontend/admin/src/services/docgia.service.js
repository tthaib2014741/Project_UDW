import { resolveComponent } from "vue";
import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/user") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const response = await this.api.get("/");
            // console.log(response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
    }
     async get(id) {
        try {
            const response= await this.api.get(`/${id}`);
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }
       
    }
    async login(data){

        try {
            const response = await this.api.post("/login",data);
          
            console.log("login trong serrvi:",response.data);
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
    }

  

   
}
  export function isAuthenticated() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  return loggedInUser !== null;
}
export default new ContactService();