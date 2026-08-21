const Jimp = require('jimp');

async function processLogo() {
  try {
    const image = await Jimp.read('public/logo.jpeg');
    
    // We want to make dark pixels transparent, and color the rest with the sage green
    const sageR = 212, sageG = 216, sageB = 197;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      // If it's dark, make it transparent
      if (brightness < 80) {
        this.bitmap.data[idx + 3] = 0; // Alpha = 0
      } else {
        // If it's light, color it with the sage color exactly, and add some anti-aliasing based on brightness
        // For pixels on the edge (brightness between 80 and 150), give them partial transparency
        let alpha = 255;
        if (brightness < 120) {
            alpha = Math.floor(((brightness - 80) / 40) * 255);
        }
        
        this.bitmap.data[idx + 0] = sageR;
        this.bitmap.data[idx + 1] = sageG;
        this.bitmap.data[idx + 2] = sageB;
        this.bitmap.data[idx + 3] = alpha;
      }
    });
    
    await image.writeAsync('public/logo-transparent.png');
    console.log("Success");
  } catch (err) {
    console.error(err);
  }
}

processLogo();
