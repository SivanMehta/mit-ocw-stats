node_modules:
	npm ci

data/playlists.json: node_modules
	@node scripts/playlists.js
