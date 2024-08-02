const express = require("express");
const router = express.Router();
const {addBook,fetchBooks,fetchAll,fetchBook,deleteBook,deleteSpecificCopy,updateBook,borrowReq,borrowReqList,borrowReqCancel,borrowReqAccept,returnBook,returnReq,returnReqList,uploadImg,returnReqCancel}= require("../controller/bookController")
const {protected} = require("../middleware/auth");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.post("/addBook",protected,addBook);
router.get("/fetchBooks/:pageNo",fetchBooks);
router.get("/fetchAll",fetchAll);
router.get("/fetchBook/:search",fetchBook);
router.delete("/deleteBook/:isbnPre",protected,deleteBook);
router.delete("/deleteSpecificCopy/:isbnPre/:id",protected,deleteSpecificCopy);
router.post("/updateBook",protected,updateBook);
router.route("/borrowReq").post(protected,borrowReq);
router.route("/borrowReqList").get(protected,borrowReqList);
router.route("/borrowReqCancel").post(protected,borrowReqCancel);
router.route("/borrowReqAccept").post(protected,borrowReqAccept);
router.route("/returnReqList").get(protected,returnReqList);
router.route("/returnReq").post(protected,returnReq);
router.route("/returnReqCancel").post(protected,returnReqCancel);
router.route("/returnBook").post(protected,returnBook);
router.route('/uploadImg').post(protected,upload.single('image'),uploadImg);
// router.route("/search/:searchitem").get(search);
module.exports = router;