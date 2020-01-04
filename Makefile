node_modules:
	npm ci

data/playlists.json: node_modules
	@node scripts/gather-playlists.js

data/videos.json: data/playlists.json
	@node scripts/gather-videos.js

data/views.json: data/videos.json
	@node scripts/gather-views.js
