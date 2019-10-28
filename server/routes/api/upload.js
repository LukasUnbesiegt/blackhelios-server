const express = require("express");
const router = express.Router();
const uploadControllers = require("../../controllers/upload/images");
const { authMiddleware } = require("../../middleware/auth");

router.post("/s3", authMiddleware, uploadControllers.uploadImagesS3);
// router.post(
// 	"/s3/delete/:productId/:imageId",
// 	authMiddleware,
// 	uploadControllers.S3Delete
// );
module.exports = router;
