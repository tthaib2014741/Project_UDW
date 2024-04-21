import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/admin/sach") {
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
    
    async create(data) {
        try {
            const response = await this.api.post("/", data);
            console.log(response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
       
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        try {
            const response = await this.api.get(`/${id}`);
            console.log("lay sach da muon:")
            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }
       
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new ContactService();