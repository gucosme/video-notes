const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'video-notes-server' });

module.exports = logger;
