import fs from 'fs';

try {
  fs.copyFileSync('./dist/index.html', './dist/404.html');
  console.log('Successfully copied index.html to 404.html for GitHub Pages routing fallback.');
} catch (err) {
  console.error('Error copying file:', err);
}
