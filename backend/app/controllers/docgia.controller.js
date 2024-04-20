const Docgia = require("../services/docgia.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const passport = require('passport');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
          return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
      }
      // Đăng nhập thành công, trả về thông tin người dùng
      return res.status(200).json({ message: 'Đăng nhập thành công', user: user });
  })(req, res, next);
};

exports.create = async (req, res, next) => {
    if (!req.body?.TEN) {
        return next(new ApiError(400, "Tên không được để trống"));
    }
    try {
        const docgia = new Docgia(MongoDB.client);
        const document = await docgia.create(req.body);
        
        return res.status(200).send({ message: "Thêm nhân viên thành công", createdContact: document });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while creating "));
    }
    
};
exports.get = async (req, res, next) => {

    try {
        const docgia = new Docgia(MongoDB.client);

        const document = await docgia.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Không tìm thấy nguoi dung "));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};
