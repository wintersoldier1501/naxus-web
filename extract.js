const fs = require('fs'); 
const content = fs.readFileSync('public/logo-transparent.svg', 'utf8'); 
const match = content.match(/base64,([^"']+)/); 
if(match) { 
  fs.writeFileSync('src/app/icon.png', Buffer.from(match[1], 'base64')); 
  console.log('Saved'); 
} else {
  console.log('No base64 found');
}
