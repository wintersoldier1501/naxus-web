const sharp = require('sharp');
const fs = require('fs');

sharp('src/app/icon.png')
  .trim()
  .toFile('src/app/icon-cropped.png')
  .then(info => {
    console.log('Cropped successfully:', info);
    fs.renameSync('src/app/icon-cropped.png', 'src/app/icon.png');
    // Also remove the old icon.svg
    if (fs.existsSync('src/app/icon.svg')) {
      fs.unlinkSync('src/app/icon.svg');
    }
  })
  .catch(err => {
    console.error('Error cropping:', err);
  });
