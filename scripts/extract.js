import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

// The script runs from ~/. Copy zip to home first, then extract.
const homeDir = process.env.HOME || '/home/user';
const outputDir = join(homeDir, 'extracted');

mkdirSync(outputDir, { recursive: true });

// List files in home dir to find the zip
console.log('Home dir:', homeDir);
console.log('CWD:', process.cwd());
const cwdFiles = readdirSync(process.cwd());
console.log('CWD files:', cwdFiles);

// Try to find and extract the zip
try {
  execSync(`unzip -o "saveweb2zip-com-raspadinhaao-netlify-app.zip" -d "${outputDir}" 2>&1`, { cwd: process.cwd() });
} catch(e) {
  console.log('unzip error:', e.message);
  // Try listing what we have
  console.log('Trying to find zip...');
  const result = execSync('find . -name "*.zip" 2>/dev/null || true').toString();
  console.log('Found zips:', result);
}

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
