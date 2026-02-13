import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const zipFile = '/vercel/share/v0-project/saveweb2zip-com-raspadinhaao-netlify-app.zip';
const outputDir = '/vercel/share/v0-project/extracted';

execSync(`mkdir -p ${outputDir}`);
execSync(`unzip -o "${zipFile}" -d "${outputDir}"`);

function listFiles(dir, prefix = '') {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      console.log(`${prefix}${item}/`);
      listFiles(fullPath, prefix + '  ');
    } else {
      console.log(`${prefix}${item} (${stat.size} bytes)`);
    }
  }
}

console.log('Extracted files:');
listFiles(outputDir);
