const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Sach = client.db().collection("Sach");
    }

    extractContactData(payload) {
        const sach = {
            TENSACH: payload.TENSACH,
            DONGIA: payload.DONGIA,
            DONGIA: payload.DONGIA,
            SOQUYEN: payload.SOQUYEN,
            NAMXUATBAN: payload.NAMXUATBAN,
            MANXB: payload.MANXB,
            TACGIA:payload.TACGIA

        };
        Object.keys(sach).forEach(
            (key) => sach[key] === undefined && delete sach[key]
        );
        return sach;
    }

   
    async create(payload) {
            const sach = this.extractContactData(payload);
            const result = await this.Sach.insertOne(sach); 
            return result.insertedId; // Trả về ID của bản ghi mới được chèn
        }
        
        
    async find(filter){
        const cursor =await this.Sach.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        console.log(name);
        const result= await this.Sach.find({
            TENSACH: {$regex: new RegExp(name,'i')},
        })
        console.log("Found result:", result.toArray());
        return await result.toArray();
    }
    async findById(id){
        return await this.Sach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    async update(id,payload){
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update =  this.extractContactData(payload);
        const result = await this.Sach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async delete(id){
        const result = await this.Sach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});   
    }
    async deleteAll(){
        const result= await this.Sach.deleteMany({}) ;
        console.log(result);
        return result.deletedCount;
    }
    async giamSoQuyenTrongSach(maSach) {
        console.log("giam sách");
    try {
        const filter ={
            _id: ObjectId.isValid(maSach) ? new ObjectId(maSach) : null,
        };
        const update = { $inc: { SOQUYEN: -1 } };

        const result = await this.Sach.findOneAndUpdate(
            filter,
            update,
            { returnOriginal: false } // Trả về dữ liệu sau khi cập nhật
        );

        if (!result) {
            console.log("Không tìm thấy sách để cập nhật.");
            // Xử lý logic nếu sách không tồn tại
        } else {
            console.log("Số quyển trong sách đã được giảm.");
            // Xử lý logic sau khi giảm số quyển thành công
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật số quyển trong sách:", error);
        // Xử lý lỗi
    }
    }
     async TangSoQuyenTrongSach(maSach) {
        console.log("giam sách");
    try {
        const filter ={
            _id: ObjectId.isValid(maSach) ? new ObjectId(maSach) : null,
        };
        const update = { $inc: { SOQUYEN: +1 } };

        const result = await this.Sach.findOneAndUpdate(
            filter,
            update,
            { returnOriginal: false } // Trả về dữ liệu sau khi cập nhật
        );

        if (!result) {
            console.log("Không tìm thấy sách để cập nhật.");
            // Xử lý logic nếu sách không tồn tại
        } else {
            console.log("Số quyển trong sách đã được giảm.");
            // Xử lý logic sau khi giảm số quyển thành công
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật số quyển trong sách:", error);
        // Xử lý lỗi
    }
}

}

module.exports = ContactService;
