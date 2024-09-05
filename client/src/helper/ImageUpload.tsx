import React from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

const ImageUpload: React.FC = () => {
  const CLOUD_NAME = "dbibwzs6c";

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <CloudinaryContext cloudName={CLOUD_NAME}>
      <input
        type='file'
        onChange={handleUpload}
      />
      {/* Example of displaying an uploaded image */}
      <Image
        publicId='sample'
        width={300}
        crop='scale'
      >
        {/* <Transformation
          quality='auto'
          fetchFormat='auto'
        /> */}
      </Image>
    </CloudinaryContext>
  );
};

export default ImageUpload;
