const  express = require("express");
const docgia= require("../controllers/docgia.controller");
const muonsach= require("../controllers/muonsach.controller");

const router = express.Router();

router.route("/")
    .post(docgia.create)

router.route("/muonsach")
    .post(muonsach.create)
    .get(muonsach.findAll)
router.route("/muonsach/:id")
    .get(muonsach.findByMADOCGIA)
    .delete(muonsach.huymuon)
router.route("/:id")
    .get(docgia.get)
router.route("/muonsach/duyet/:id")
        .get(muonsach.duyet)
router.route("/muonsach/tra-sach/:id")
        .get(muonsach.tra)     
module.exports = router;