const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection("nhanvien");
    }

    extractContactData(payload) {
        const Nhanvien = {
            MSNV: payload.MSNV,
            HOTENNV: payload.HOTENNV,
            PASSWORD: payload.PASSWORD,
            CHUCVU: payload.CHUCVU,
            DIACHI: payload.DIACHI,
            DIENTHOAI:payload.DIENTHOAI
        };
        Object.keys(Nhanvien).forEach(
            (key) => Nhanvien[key] === undefined && delete Nhanvien[key]
        );
        return Nhanvien;
    }

    async create(payload) {
        const nhanvien = this.extractContactData(payload);
        const hashedPassword = await bcrypt.hash(nhanvien.PASSWORD, 10);

        nhanvien.PASSWORD = hashedPassword;
        const result = await this.Nhanvien.insertOne(nhanvien); 
        return result.insertedId;
    }

    async findById(id){
        return await this.Nhanvien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async authenticate(username, password) {
        try {
            console.log(`Quan ly::::du lieu kt:::${username},:::${password}`);
            const user = await this.Nhanvien.findOne({ HOTENNV: username });
            console.log(user);
            if (!user) {
                return null; // Không tìm thấy người dùng
            }
            // So sánh mật khẩu
            const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
            if (!passwordMatch) {
                return null; // Mật khẩu không khớp
            }
            return user; // Đăng nhập thành công, trả về thông tin người dùng
        } catch (error) {
            throw new ApiError(500, "Lỗi trong quá trình xác thực người dùng");
        }
    }
    async findByUsername(username) {
        try {
            console.log(`${username}`);
            const user = await this.Nhanvien.findOne({ HOTENNV: username });
            console.log(user);
            if (!user) {
                return null; // Không tìm thấy người dùng
            }
            return user; // Đăng nhập thành công, trả về thông tin người dùng
        } catch (error) {
            throw new ApiError(500, "Lỗi trong quá trình xác thực người dùng");
        }
    }
}

module.exports = NhanvienService;
