const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const image = sharp('src/app/icon.png');
  const metadata = await image.metadata();
  
  // Create an image with an alpha channel if it doesn't have one
  await image
    .ensureAlpha()
    .toFile('src/app/icon-temp.png');

  // Let's trim it again, but this time assuming the background might be black #000000
  // sharp's trim removes the background color automatically by looking at the top-left pixel
  await sharp('src/app/icon-temp.png')
    .trim()
    .toFile('src/app/icon-alpha.png');

  fs.renameSync('src/app/icon-alpha.png', 'src/app/icon.png');
  fs.unlinkSync('src/app/icon-temp.png');
  console.log('Done');
}
processImage();
