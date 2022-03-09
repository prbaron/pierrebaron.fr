const sharp = require('sharp');
const { resolve } = require('path');
const {
  readdir,
  stat,
} = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

;(async () => {
  for await (const f of getFiles('src/img')) {
    const filePath = f.replace(/\.[^/.]+$/, '');

    const parts = f.split('/');
    const filename = parts[parts.length - 1];

    if (
      filename.endsWith('.png')
      || filename.endsWith('.jpg')
      || filename.endsWith('.jpeg')
    ) {
      await sharp(f)
        .toFormat("webp")
        .toFile(`${filePath}.webp`);
    }
  }
})();
