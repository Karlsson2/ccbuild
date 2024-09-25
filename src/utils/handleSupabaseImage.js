import { supabase } from "./supabase";

function generateTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.-]/g, ""); // Format: YYYYMMDDTHHMMSS
}

export const uploadProjectImage = async (file) => {
  const { data, error } = await supabase.storage
    .from("ccbuild") // från bucket
    .upload(`project_image/${file.name}`, file); // ladda upp till specifik map

  if (error) {
    console.error("Error uploading data: ", error);
    return;
  }

  const fileUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/ccbuild/${file.name}`; // Skapa url att hämta bild från

  console.log("File uploaded successfully", fileUrl);

  await saveImgPathToDb(fileUrl);
};

export const uploadProductImagWithReturn = async (file) => {
  const timestamp = generateTimestamp();

  const { data, error } = await supabase.storage
    .from("ccbuild")
    .upload(`product_image/${file.name}${timestamp}`, file);

  if (error) {
    console.error("Error uploading data: ", error);
    return null; // Return null if upload fails
  }

  const fileUrl = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/ccbuild/product_image/${file.name}${timestamp}`;

  console.log("File uploaded successfully", fileUrl);

  return fileUrl; // Return the URL for further use
};

export const uploadProductImage = async (file) => {
  const { data, error } = await supabase.storage
    .from("ccbuild") // från bucket
    .upload(`product_image/${file.name}`, file); // ladda upp till specifik map

  if (error) {
    console.error("Error uploading data: ", error);
    return;
  }

  const fileUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/ccbuild/${file.name}`; // Skapa url att hämta bild från

  console.log("File uploaded successfully", fileUrl);

  await saveImgPathToDb(fileUrl);
};

export const saveImgPathToDb = async (fileUrl) => {
  const { data, error } = await supabase
    .from("products") // vårt supabase table
    .insert([{ image_url: fileUrl }]); // spara i databasen

  if (error) {
    console.error("Error inserting image into database: ", error);
  } else {
    console.log("Image has successfully been inserted into DB");
  }
};

export const fetchImage = async () => {
  const { data: images, error } = await supabase
    .from("products") // från table
    .select("image_url");

  if (error) {
    console.error("Error fetching image: ", error);
    return;
  } else {
    console.log("Images successfully fetched", images);
    return images;
  }
};

export const uploadNewProductImage = async (file) => {
  const timestamp = generateTimestamp();
  const { data, error } = await supabase.storage
    .from("ccbuild") // Specify the bucket
    .upload(`product_image/${timestamp}${file.name}`, file); // Upload to a specific folder

  if (error) {
    console.error("Error uploading product image: ", error);
    return null;
  }

  const fileUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/ccbuild/${timestamp}${file.name}`;
  console.log("Product image uploaded successfully", fileUrl);

  // Return the file name
  return `${timestamp}${file.name}`;
};
