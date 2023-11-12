const cloudinary = require("cloudinary");
const uuid = require("uuid");

cloudinary.config({
  cloud_name: "dw8znavtx",
  api_key: "822598955963446",
  api_secret: "yVvUWrDUVNvpswudLD5r8oe7a58",
});

const uploadToCloudinary = async (file, folder, imagePublicId) => {
  //   const options = imagePublicId
  //     ? {
  //         public_id: imagePublicId,
  //         overwrie: true,
  //       }
  //     : {
  //         public_id: `${folder}/${uuid.v4()}`,
  //       };
  //   return new Promise((resolve, reject) => {
  //     const streamLoad = cloudinary.v2.uploader.upload(
  //       options,
  //       (error, result) => {
  //         if (result) {
  //           resolve(result);
  //         } else {
  //           reject(error);
  //         }
  //       }
  //     );
  //     return streamLoad;
  //   });
  return await cloudinary.uploader.upload(file, {
    folder: folder,
  });
};

module.exports = { uploadToCloudinary };
