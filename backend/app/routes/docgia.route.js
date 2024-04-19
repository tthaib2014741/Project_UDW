const  express = require("express");
const docgia= require("../controllers/docgia.controller");

const router = express.Router();

router.route("/")
    .post(docgia.create)


 

module.exports = router;