const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SEC,
    secure: true,
});

const uploadImage = (imagePath, callback) => {
    cloudinary.uploader.upload(imagePath, (result, error) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};

module.exports = uploadImage
