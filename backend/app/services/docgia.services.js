const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection("docgia");
    }

    extractContactData(payload) {
        const DOCGIA = {
            MADOCGIA: payload.MADOCGIA,
            HOLOT: payload.HOLOT,
            TEN: payload.TEN,
            PASSWORD: payload.PASSWORD,
            NGAYSINH: payload.NGAYSINH,
            PHAI: payload.PHAI,
            DIACHI: payload.DIACHI,
            DIENTHOAI:payload.DIENTHOAI

        };
        Object.keys(DOCGIA).forEach(
            (key) => DOCGIA[key] === undefined && delete DOCGIA[key]
        );
        return DOCGIA;
    }

   
    
    async create(payload) {
        const docgia = this.extractContactData(payload);
        const hashedPassword = await bcrypt.hash(docgia.PASSWORD, 10);

        docgia.PASSWORD = hashedPassword;
        const result = await this.Docgia.insertOne(docgia); 
        return result.insertedId;
    }

    async findById(id){
        return await this.Docgia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async authenticate(username, password) {
        try {
            console.log(`user kt:::${username},:::${password}`);
            const user = await this.Docgia.findOne({ TEN: username });
            if (!user) {
                return null; // Không tìm thấy người dùng
            }
            // So sánh mật khẩu
            const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
            if (!passwordMatch) {
                return null; // Mật khẩu không khớp
            }
            console.log(user);

            return user; // Đăng nhập thành công, trả về thông tin người dùng
        } catch (error) {
            throw new ApiError(500, "Lỗi trong quá trình xác thực người dùng");
        }
    }
    async findByUsername(username) {
        try {
            console.log(`${username}`);
            const user = await this.Docgia.findOne({ TEN: username });
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

module.exports = DocgiaService;
