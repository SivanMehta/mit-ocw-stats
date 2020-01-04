const get = require('./get');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const write = promisify(fs.writeFile);

const MIT = 'UCEBb1b_L6zDS3xTUrIALZOw';
const identifyingDescription = /View the complete course: https:\/\/ocw\.mit\.edu/;

async function run () {

  const data = await get('https://content.googleapis.com/youtube/v3/playlists', {
    channelId: MIT,
    maxResults: 50,
    part: 'snippet',
  });

  const playlists = data.items.map(item => ({
    id: item.id,
    name: item.snippet.title,
    description: item.snippet.description
  }));

  const courses = playlists.filter(pl => identifyingDescription.test(pl.description));

  await write(path.join(__dirname, '..', 'data', 'playlists.json'), JSON.stringify(courses));
}

run();
