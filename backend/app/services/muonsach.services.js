const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Muonsach = client.db().collection("muonsach");
    }

    extractContactData(payload) {
        const muonsach = {
            MADOCGIA: payload.MADOCGIA,
            MASACH: payload.MASACH,
             NGAYMUON: payload.NGAYMUON,
            NGAYTRA: payload.NGAYMUON,
            TRANGTHAI:payload.TRANGTHAI
        };
        Object.keys(muonsach).forEach(
            (key) => muonsach[key] === undefined && delete muonsach[key]
        );
        return muonsach;
    }

   
    async create(payload) {
        const muonsach = this.extractContactData(payload);
        muonsach.NGAYMUON = new Date().toLocaleString();
        muonsach.NGAYTRA = null; 
        muonsach.TRANGTHAI = 0;
        const result = await this.Muonsach.insertOne(muonsach);
        return result.insertedId;
    }

        
        
    async find(filter){
        const cursor =await this.Muonsach.find(filter);
        return await cursor.toArray();
    }
    async findByMADOCGIA(MADOCGIA){
         return await this.find({
            MADOCGIA: {$regex: new RegExp(MADOCGIA), $options:"i"},
        })
    }
    // async findById(id){
    //     return await this.Muonsach.findOne({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     })
    // }
    async duyet(id) {
        const muonsach= { };
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(muonsach);
       update.TRANGTHAI = 1;
        const result = await this.Muonsach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async tra(id, payload) {
        const muonsach= { };
         
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(muonsach);
        update.NGAYTRA =  new Date().toLocaleString();
        const result = await this.Muonsach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async huymuon(id) {

        const result = await this.Muonsach.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        if (result.TRANGTHAI == 0) {
             return result;
        }
       
    }
}

module.exports = ContactService;
