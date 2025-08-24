/**
 * Converts an array of image URLs to the specified format (e.g., PNG, JPEG).
 * @param {Array} images - An array of image objects with `title` and `image` properties.
 * @param {string} format - The desired output image format (e.g., "image/png", "image/jpeg").
 * @returns {Promise<Array>} - A promise that resolves to an array of updated image objects.
 */
export const convertImagesToFormat = async (products, targetFormat) => {
    try {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          if (product.image.startsWith("http")) {
            // Skip external URLs
            return product;
          }
          const response = await fetch(product.image);
          const blob = await response.blob();
          const imageBitmap = await createImageBitmap(blob);
  
          const canvas = document.createElement("canvas");
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
  
          const ctx = canvas.getContext("2d");
          ctx.drawImage(imageBitmap, 0, 0);
  
          const convertedImage = canvas.toDataURL(targetFormat);
  
          console.log(`Converted ${product.title}:`, convertedImage); // Log conversion result
          return { ...product, image: convertedImage };
        })
      );
      return updatedProducts;
    } catch (error) {
      console.error("Error during image conversion:", error);
      return products; // Return original products in case of error
    }
  };
  