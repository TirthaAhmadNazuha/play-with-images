exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const base64Image = body.image;
    let { quality, width, type } = body;

    const sharp = (await import('sharp')).default;

    const imageBuffer = Buffer.from(base64Image, 'base64');
    const modify = sharp(imageBuffer);
    modify[type]({ quality, progressive: true });
    if (width) modify.resize({ width });
    const compressedBuffer = modify.toBuffer();

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
