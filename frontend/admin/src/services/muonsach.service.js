import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/admin/docgia") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const response = await this.api.get("/muonsach");
            console.log("danh sach muon sach",response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }
    }

    async create(data) {
        try {
            const response = await this.api.post("/muonsach", data);
            console.log(response.data); // Log dữ liệu trả về từ API
            return response.data;
        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error; // Re-throw lỗi để phía gọi có thể xử lý
        }

    }
   
    async get(id) {
        try {
            const response = await this.api.get(`/muonsach/${id}`);

            console.log(response.data);
            
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }
    async getDocgia(id) {
        try {
            const response = await this.api.get(`/${id}`);
            console.log("Du lieu thong tin user:")

            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }
    async duyet(id) {
        try {
            const response = await this.api.get(`/muonsach/duyet/${id}`);
            console.log("Du lieu thong tin duyet")

            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }
    async tra(id) {
        try {
            const response = await this.api.get(`/muonsach/tra-sach/${id}`);
            console.log("Du lieu thong tin tra")

            console.log(response.data);
            // console.log("get id");
            return response.data;

        } catch (error) {
            console.error("Error while fetching data:", error);
            throw error;
        }

    }

    async update(id, data) {
        return (await this.api.put(`/muonsach/${id}`, data)).data;
    }

}
export default new ContactService();