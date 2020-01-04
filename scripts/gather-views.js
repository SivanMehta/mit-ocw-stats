const get = require('./get');
const path = require('path');
const playlists = require(path.join('..', 'data', 'videos.json'));
const fs = require('fs');
const { promisify } = require('util');
const write = promisify(fs.writeFile);

// the youtube data api already gives us these videos in order
async function gatherViews(id, idx) {
  const data = await get('https://content.googleapis.com/youtube/v3/videos', {
    id,
    maxResults: 50,
    part: 'statistics'
  });

  return {
    id,
    idx,
    views: data.items[0].statistics.viewCount
  };
}

async function gatherStats(playlist) {
  const { playlistId, videos } = playlist;
  const data = await Promise.all(videos.map((v, i) => gatherViews(v, i)));

  return data.map(video => ({
    videoId: video.id,
    playlistId,
    views: video.views
  }));
}

async function run() {
  const data = await Promise.all(playlists.map(pl => gatherStats(pl)));
  await write(path.join(__dirname, '..', 'data', 'views.json'), JSON.stringify(data));
}

run();
