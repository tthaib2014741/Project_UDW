const  express = require("express");
const docgia= require("../controllers/docgia.controller");

const router = express.Router();

router.route("/")
    // .get(docgia.findAll)
    .post(docgia.create)
    // .delete(sach.deleteAll);

// router.route("/favorite")
//     .get(contact.findAllFavorite);

router.route("/:id")
    .get(docgia.findOne)
    // .put(sach.update)
    // .delete(sach.delete); 

module.exports = router;