const pdf = require('pdf-parse/lib/pdf-parse.js');
const fs = require('fs');

const pdfBuffer = fs.readFileSync('F:/Portfolio/Lila games.pdf');
pdf(pdfBuffer).then(data => {
  fs.writeFileSync('F:/Portfolio/portfolio-website/scratch/lila_raw.txt', data.text, 'utf8');
  console.log('Pages:', data.numpages);
  console.log('Text length:', data.text.length);
  console.log('Done');
}).catch(err => console.error(err));
