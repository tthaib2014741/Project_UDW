const MuonsachService = require("../services/muonsach.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const contactService = new MuonsachService(MongoDB.client);
        const document = await contactService.create(req.body);
        
        return res.status(200).send({ message: "mượn sách thành công", createdContact: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating the nxb"));
    }
};
exports.findAll = async (req, res, next) => {
    let documents =[];
    
    try {
        const contactService = new MuonsachService(MongoDB.client);
       
      
            documents = await contactService.find({});
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
    return res.send(documents);
};
exports.findByMADOCGIA = async (req, res, next) => {

    try {
        const contactService = new MuonsachService(MongoDB.client);
        const document = await contactService.findByMADOCGIA(req.params.id);
        if(!document){
            return next(new ApiError(400, "Khong tìm thấy"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data  to update can not be empty"));
    }
    try {
        const contactService = new MuonsachService(MongoDB.client);
        const document = await contactService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400, "nxb not found"));
        }
        return res.status(200).send({ message: "nxb updated successfully", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};
exports.duyet = async (req, res, next) => {
   
    try {
        const contactService = new MuonsachService(MongoDB.client);
        const document = await contactService.duyet(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy lịch sử mượn"));
        }
        return res.status(200).send({ message: "Duyệt thành công", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};
exports.tra = async (req, res, next) => {
   
    try {
        const contactService = new MuonsachService(MongoDB.client);
        const document = await contactService.tra(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy lịch sử mượn"));
        }
        return res.status(200).send({ message: "Trả thành công", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};
exports.huymuon = async (req, res, next) => {
    try {
        const muonsachService = new MuonsachService(MongoDB.client);
        const document = await muonsachService.huymuon(req.params.id);
        if(!document){
            return next(new ApiError(400, "không tìm thấy thông tin mượn"));
        }
        return res.status(200).send({ message: "hủy thành công" });

    } catch (error) {
        return next(new ApiError(500, 
            `khong the xoa  id=${req.params.id}`));
    }
   
};

