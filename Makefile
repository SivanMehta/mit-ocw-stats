node_modules:
	npm ci

playlists.json: node_modules
	node scripts/playlists.js
