const upload = require("../misc/image-upload");
const uploadS3 = upload.any();
class UploadService {
  constructor() {}

  async uploadImagesS3(req, res) {
    let errors = {};

    return new Promise((resolve, reject) => {
      uploadS3(req, res, err => {
        if (err) {
          return res.status(500).send({
            err: err,
            success: false
          });
        } else {
          var files = req.files;
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
