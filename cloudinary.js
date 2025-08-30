const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// install this npm install multer-storage-cloudinary --legacy-peer-deps

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'StayAnyTime',
        allowedFormet: ["jpg", "png", "jpeg"]
    },
});

module.exports={
    cloudinary,
    storage
}