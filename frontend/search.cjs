const fs = require('fs');
const path = require('path');

function search(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      search(fullPath, pattern);
    } else if (stat.isFile() && (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.html'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (pattern.test(content)) {
        console.log(`Match found in: ${fullPath}`);
        // print matched lines
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (pattern.test(line)) {
            console.log(`${i + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

search('C:/Users/Asus/startup/novoplast-store/frontend', /onMouseMove|onMouseEnter|onPointerMove|onHover|mouse|cursor|Cursor/i);
