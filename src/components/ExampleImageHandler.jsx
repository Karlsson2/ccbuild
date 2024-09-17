import { fetchImage, uploadProjectImage, uploadProductImage, saveImgPathToDb } from "../utils/handleSupabaseImage";
import { useState, useEffect } from "react";

export default function ExampleImageHandler () {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const fetchedImages = await fetchImage();
            setImages(fetchedImages || []);
          } catch (error) {
            console.error("Unexpected error:", error);
          }
        };
    
        fetchImages();
      }, []);
    
      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
          await uploadProjectImage(file);
        }
      };


    return (
        <>
        <input type="file" onChange={handleImageUpload} />
        <div className="image-gallery">
            {images.length > 0 ? (
                images.map((image, index) => (
                <img key={index} src={image.image_url} alt={`Image ${index}`} />
                ))
            ) : (
                <p>No images found.</p>
            )}
            </div>
        
        </>
    )
}