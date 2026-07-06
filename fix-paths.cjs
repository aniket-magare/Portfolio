const fs = require('fs');
const path = require('path');

const regex = /"\/(.+?\.(?:jpg|jpeg|png|svg|webp|pdf))"/gi;

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(regex, '"$1"');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed', filePath);
    }
  }
});
