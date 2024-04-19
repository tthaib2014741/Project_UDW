const express = require("express");
const nhanvienController = require("../controllers/nhanvien.controller"); // Sửa đường dẫn import
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
// Sử dụng express-session middleware


router.route("/")
    .post(nhanvienController.create); 




module.exports = router;
