const rp = require('request-promise');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const read = promisify(fs.readFile);

module.exports = async function get(url, qs) {
  const secret = await read(path.join(__dirname, '..', 'secret.json'));
  const apiKey = JSON.parse(secret).api_key;

  const querystring = {
    ...qs,
    key: apiKey
  }

  const raw = await rp({ url, qs: querystring });
  return JSON.parse(raw);
}
