const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.DOCGIA = client.db().collection("docgia");
    }

    extractContactData(payload) {
        const DOCGIA = {
            MADOCGIA: payload.MADOCGIA,
            HOLOT: payload.HOLOT,
            TEN: payload.TEN,
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
            const sach = this.extractContactData(payload);
            const result = await this.DOCGIA.insertOne(sach); 
            return result.insertedId; // Trả về ID của bản ghi mới được chèn
        }
        
    
    
    async findById(id){
        return await this.DOCGIA.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
   
   
}

module.exports = ContactService;
