const sharp = require('sharp');

// Create a nice dark 1200x630 Open Graph image with the Naxus logo in the center
sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 18, g: 20, b: 28, alpha: 1 } // #12141c
  }
})
.composite([
  {
    input: 'public/logo-transparent.svg',
    gravity: 'center'
  }
])
.png()
.toFile('public/og-image.png')
.then(() => console.log('OG image created!'))
.catch(err => console.error(err));
