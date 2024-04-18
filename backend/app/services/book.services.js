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
}

module.exports = ContactService;
