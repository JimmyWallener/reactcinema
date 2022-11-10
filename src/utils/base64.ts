const encodeToImageBase64 = (image: Blob) => {
  const fs = new FileReader();
  fs.readAsDataURL(image);
  return new Promise((resolve, reject) => {
    fs.onload = () => {
      resolve(fs.result);
    };
    fs.onerror = (error) => {
      reject(error);
    };
  });
};

export default encodeToImageBase64;
