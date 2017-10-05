const winston = require('winston');
const ip = require('ip');
const os = require('os');

winston.emitErrs = true;

var logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)()
  ],
  handleExceptions: true,
  humanReadableUnhandledException: true,
  exitOnError: false,
  meta: true
});

// Setup logging for LogDNA cloud logging.
if (process.env.LOGDNA_API_KEY) {
  require('logdna');
  logger.add(winston.transports.Logdna, {
    level: 'info',
    app: 'discord-bot',
    index_meta: true,
    key: process.env.LOGDNA_API_KEY,
    ip: ip.address(),
    hostname: os.hostname()
  });

  logger.info('Started LogDNA winston transport.');
}

module.exports = logger;
