const upload = require("../misc/image-upload");
const uploadS3 = upload.any();
class UploadService {
	constructor() {}

	async uploadImagesS3(req, res) {
		let errors = {};

		return new Promise((resolve, reject) => {
			uploadS3(req, res, err => {
				if (err) {
					console.log("err", err);
					return res.status(500).send({
						err: err,
						success: false
					});
				} else {
					var files = req.files;

					console.log("files", req.files);
					let results = files.map(file => {
						return {
							public_id: file.key,
							url: file.location
						};
					});

					res.status(200).send({
						success: true,
						results: results
					});
				}
			});
		});
	}

	async uploadImagesCD() {}
	async uploadImageS3() {}
	async S3Delete() {}
}

module.exports = new UploadService();

// S3Upload(req, res, err => {
// 	if (err) {
// 		return res.status(422).send({
// 			erorrs: [{ title: "Image upload error", detail: err.message }]
// 		});
// 	}
// 	var files = req.files;
// 	results = files.map(file => {
// 		return {
// 			public_id: file.key,
// 			url: file.location
// 		};
// 	});

// 	res.status(200).send({
// 		success: true,
// 		results: results
// 	});
// });

// S3Upload(req, res, err => {
// 	if (err) {
// 		return res.status(422).send({
// 			erorrs: [{ title: "Image upload error", detail: err.message }]
// 		});
// 	}
// 	var file = req.file;
// 	const image = {
// 		public_id: file.key,
// 		url: file.location
// 	};

// 	res.status(200).send({
// 		success: true,
// 		result: image
// 	});
// });

// const { imageId, productId } = req.params;
// console.log(imageId);
// console.log(productId);
// Product.findOneAndUpdate(
// 	{ _id: productId },
// 	{ $pull: { images: { public_id: imageId } } },
// 	{ upsert: true, new: true },
// 	(err, updatedProduct) => {
// 		console.log(updatedProduct);
// 		if (err) return res.json({ succes: false });
// 		res.status(200).send({ success: true, product: updatedProduct });
// 	}
// );
// var params = { Bucket: "estore", Key: imageId };
// s3.deleteObject(params, function(err, data) {
// 	if (err) console.log(err, err.stack);
// 	// error
// 	else console.log("deleted"); // deleted
// });
