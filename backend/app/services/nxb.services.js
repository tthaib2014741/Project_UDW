const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Nxb = client.db().collection("nxb");
    }

    extractContactData(payload) {
        const nxb = {
            name: payload.name,
            address: payload.address,
        };
        Object.keys(nxb).forEach(
            (key) => nxb[key] === undefined && delete nxb[key]
        );
        return nxb;
    }

   
    async create(payload) {
            const contact = this.extractContactData(payload);
            const result = await this.Nxb.insertOne(payload); // Sử dụng insertOne() thay vì findOneAndUpdate()
            return result.insertedId; // Trả về ID của bản ghi mới được chèn
        }
        
        
    async find(filter){
        const cursor =await this.Nxb.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name), $options:"i"},
        })
    }
    async findById(id){
        return await this.Nxb.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
    async update(id,payload){
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update =  this.extractContactData(payload);
        const result = await this.Nxb.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async delete(id){
        const result = await this.Nxb.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});   
    }
    async deleteAll(){
        const result= await this.Nxb.deleteMany({}) ;
        console.log(result);
        return result.deletedCount;
    }
}

module.exports = ContactService;
