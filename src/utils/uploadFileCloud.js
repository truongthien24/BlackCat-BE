const cloudinary = require("cloudinary");
const uuid = require("uuid");

cloudinary.config({
  cloud_name: "dsbvqrhhk",
  api_key: "147731471822864",
  api_secret: "I8ywJkvXO3-qmuARLi_8fYe6Pig",
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
