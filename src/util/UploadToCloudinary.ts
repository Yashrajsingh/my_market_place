const UploadToCloudinary = async (pics: File) => {
  const cloud_name = "ldvj1h2z";
  const upload_preset = "Yashraj Singh";

  if (pics) {

  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/ldvj1h2z/image/upload`,
    {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    return fileData.secure_url;
  } else {
    console.log("No file provided");
  }
};

export default UploadToCloudinary;