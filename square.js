const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  // Read current cropped size
  const metadata = await sharp('src/app/icon.png').metadata();
  const maxDim = Math.max(metadata.width, metadata.height);
  // Add a small 5% padding to the max dimension to look good
  const targetSize = Math.floor(maxDim * 1.1);

  await sharp('src/app/icon.png')
    .resize({
      width: metadata.width,
      height: metadata.height,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .extend({
      top: Math.floor((targetSize - metadata.height) / 2),
      bottom: Math.ceil((targetSize - metadata.height) / 2),
      left: Math.floor((targetSize - metadata.width) / 2),
      right: Math.ceil((targetSize - metadata.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile('src/app/icon-square.png');

  fs.renameSync('src/app/icon-square.png', 'src/app/icon.png');
  console.log('Square done!');
}
processImage();
