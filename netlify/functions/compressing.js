exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const base64Image = body.image; // Assuming you send the image data as "image" in the request body

    const sharp = (await import('sharp')).default;

    // Decode Base64 image data to a Buffer
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Compress JPEG image using sharp
    const compressedBuffer = await sharp(imageBuffer)
      .resize({ width: 1080 })
      .jpeg({ quality: 50, progressive: true }) // Adjust quality as needed
      .toBuffer();

    // Base64 encode the compressed image
    const compressedBase64 = compressedBuffer.toString('base64');

    return {
      statusCode: 200,
      body: JSON.stringify({ compressedImage: compressedBase64 }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Image compression failed. Error: ${error}` }),
    };
  }
};
