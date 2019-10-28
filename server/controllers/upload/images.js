const uploadService = require("../../services/UploadService");
const upload = require("../../misc/image-upload");
const uploadS3 = upload.any();

const uploadImagesS3 = function(req, res) {
	uploadService
		.uploadImagesS3(req, res)
		.then(results => {
			return res.status(200).send({
				success: true,
				results: results
			});
		})
		.catch(err => {
			console.log("err", err);
			return res.status(500).send({
				err,
				success: false
			});
		});
};
const uploadImageS3 = function(req, res) {};
const S3Delete = function(req, res) {};
module.exports = {
	uploadImagesS3,
	uploadImageS3,
	S3Delete
};

/**
 * CLOUDINARY
 */
// const cloudinary = require("cloudinary");

// cloudinary.config({
// 	cloud_name: config.CD_CLOUD_NAME,
// 	api_key: config.CD_CLOUD_API_KEY,
// 	api_secret: config.CD_CLOUD_API_SECRET
// });

// exports.singleUpload = function(req, res) {
// 	cloudinary.v2.uploader.upload(
// 		req.files.file.path,
// 		{
// 			use_filename: true,
// 			unique_filename: false,
// 			timeout: 120000,
// 			secure: true
// 		},
// 		function(error, result) {
// 			if (error) reject(error);
// 			else
// 				res.status(200).send({ public_id: result.public_id, url: result.url });
// 		}
// 	);
// };

// exports.CDphotoupload = async function(req, res) {
// 	// uploading all images at once
// 	let filesForUpload = [];
// 	for (const key in req.files) {
// 		if (req.files.hasOwnProperty(key)) {
// 			const element = req.files[key];
// 			filesForUpload.push(element);
// 		}
// 	}
// 	// res_promises will be an array of promises
// 	let res_promises = filesForUpload.map(
// 		file =>
// 			new Promise((resolve, reject) => {
// 				cloudinary.v2.uploader.upload(
// 					file.path,
// 					{ use_filename: true, unique_filename: false, secure: true },
// 					function(error, result) {
// 						if (error) reject(error);
// 						else
// 							resolve({ public_id: result.public_id, url: result.secure_url });
// 					}
// 				);
// 			})
// 	);
// 	// Promise.all will fire when all promises are resolved
// 	Promise.all(res_promises)
// 		.then(results => {
// 			res.status(200).send({
// 				success: true,
// 				results: results
// 			});
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// };

// exports.CDimagedelete = (req, res) => {
// 	const { imageId, productId } = req.params;

// 	console.log(imageId);
// 	console.log(productId);
// 	Product.findOneAndUpdate(
// 		{ _id: productId },
// 		{ $pull: { images: { public_id: imageId } } },
// 		{ upsert: true, new: true },
// 		(err, updatedProduct) => {
// 			console.log(updatedProduct);
// 			if (err) return res.json({ succes: false });
// 			res.status(200).send({ success: true, product: updatedProduct });
// 		}
// 	);

// 	cloudinary.uploader.destroy(imageId, (error, result) => {
// 		if (error) {
// 			console.log(error);
// 		}
// 	});
// };
