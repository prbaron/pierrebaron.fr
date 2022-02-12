const fs = require('fs').promises;
const slugify = require('@sindresorhus/slugify');
const fetch = require('node-fetch');
const path = require('path');

const filenames = [
  '2021',
  '2020',
  '2019',
  // '2018',
  // '2017',
];

async function download(url, filename) {
  const response = await fetch(url);

  const buffer = await response.buffer();

  await fs.writeFile(path.join(__dirname, `../../img/spotify/`, filename + '.jpg'), buffer);
}

(async () => {
  const content = {};

  for (const filename of filenames) {
    const jsonStr = await fs.readFile(path.join(__dirname, `top-songs-${filename}.json`), 'utf-8');
    const json = JSON.parse(jsonStr);

    // json.items.forEach(async (item) => {
    //   const url = item.track.album.images[item.track.album.images.length - 1].url;
    //
    //   await download(url, slugify(item.track.album.name));
    // });

    content[filename] = json.items.map((item) => ({
      duration: item.track.duration_ms,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: {
        name: item.track.album.name,
        thumbnail: `/img/spotify/${slugify(item.track.album.name)}.jpg`,
      },
      url: item.track.external_urls.spotify,
    }));
  }

  await fs.writeFile(path.join(__dirname, '../../_data/songs.json'), JSON.stringify(content, null, 2), 'utf-8');
})();


