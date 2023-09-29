const express = require("express");
const { register } = require("../controllers/userControllers");
const { uploadParentCategoryImage } = require("../utils/aws/imageUpload");
const router = express.Router();


router.route("/register",uploadParentCategoryImage).post(register)


module.exports = router;