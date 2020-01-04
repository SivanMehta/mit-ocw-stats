const get = require('./get');
const path = require('path');
const playlists = require(path.join('..', 'data', 'playlists.json'));
const fs = require('fs');
const { promisify } = require('util');
const write = promisify(fs.writeFile);

async function gatherVideos(playlistId) {
  const data = await get('https://content.googleapis.com/youtube/v3/playlistItems', {
    playlistId,
    maxResults: 50,
    part: 'snippet'
  });

  const videos = data.items.map(item => item.snippet.resourceId.videoId);

  return {
    playlistId,
    videos
  };
}

async function run() {
  const data = await Promise.all(playlists.map(pl => gatherVideos(pl.id)));
  await write(path.join(__dirname, '..', 'data', 'videos.json'), JSON.stringify(data));
}

run();
