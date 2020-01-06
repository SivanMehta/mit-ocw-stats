const views = require('../data/views.json');
const flattened = views.reduce((acc, cur) => acc.concat(cur), []);

console.log('video,playlist,views,idx')
flattened.forEach(({ videoId, playlistId, views, idx }) => {
  const line = [videoId, playlistId, views, idx + 1].join(',');
  console.log(line);
});
