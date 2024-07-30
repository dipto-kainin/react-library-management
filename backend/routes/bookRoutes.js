const express = require("express");
const router = express.Router();
const {addBook,fetchBooks,fetchBook,deleteBook,deleteSpecificCopy,updateBook,search,borrowReq,borrowReqList,borrowReqCancel,borrowReqAccept,returnBook,returnReq,returnReqList,returnReqCancel}= require("../controller/bookController")
const {protected} = require("../middleware/auth");

router.post("/addBook",protected,addBook);
router.get("/fetchBooks/:pageNo",fetchBooks);
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
router.route("/returnBook").post(protected,returnBook);
// router.route("/search/:searchitem").get(search);
module.exports = router;