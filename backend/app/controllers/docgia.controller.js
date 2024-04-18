const Docgia = require("../services/docgia.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.TEN) {
        return next(new ApiError(400, "Tên không được để trống"));
    }
    try {
        const docgia = new Docgia(MongoDB.client);
        const document = await docgia.create(req.body);
        
        return res.status(200).send({ message: "Thêm sách thành công", createdContact: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating "));
    }
};

exports.findOne = async (req, res, next) => {

    try {
        const docgia = new Docgia(MongoDB.client);
        const document = await docgia.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy sách"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};

