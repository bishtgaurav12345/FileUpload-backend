const express = require("express");
const router = express.Router();

const {localFileUpload,imgUpload} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/imgUpload",imgUpload );
module.exports = router;