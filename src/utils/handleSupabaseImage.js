import { supabase } from "./supabase";

export const uploadProjectImage = async (file) => {
    const { data, error } = await supabase 
    .storage
    .from('ccbuild') // från bucket 
    .upload(`project_image/${file.name}`, file); // ladda upp till specifik map

    if (error) {
        console.error('Error uploading data: ', error)
        return;
    }

    const fileUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/ccbuild/${file.name}`; // Skapa url att hämta bild från

    console.log('File uploaded successfully', fileUrl)

    await saveImgPathToDb(fileUrl);
}

export const uploadProductImage = async (file) => {
    const { data, error } = await supabase 
    .storage
    .from('ccbuild') // från bucket 
    .upload(`product_image/${file.name}`, file); // ladda upp till specifik map

    if (error) {
        console.error('Error uploading data: ', error)
        return;
    }

    const fileUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/ccbuild/${file.name}`; // Skapa url att hämta bild från

    console.log('File uploaded successfully', fileUrl)

    await saveImgPathToDb(fileUrl);
}

export const saveImgPathToDb = async (fileUrl) => {
    const {data, error} = await supabase
    .from('products') // vårt supabase table
    .insert([{ image_url: fileUrl}]) // spara i databasen

    if (error) {
        console.error('Error inserting image into database: ', error)
    } else {
        console.log('Image has successfully been inserted into DB')
    }
    
}

export const fetchImage = async () => {
    const {data: images, error} = await supabase
    .from('products') // från table
    .select('image_url')

    if (error) {
        console.error('Error fetching image: ', error)
        return;
    } else {
        console.log('Images successfully fetched', images)
        return images;
    }
}