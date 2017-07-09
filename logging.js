var config = require('config');
var winston = require('winston');
var logdna = require('logdna');
var ip = require('ip');
var os = require("os");

winston.emitErrs = true;
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
          level: 'warn',
          handleExceptions: true,
          humanReadableUnhandledException: true,
          json: false,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'discord.log',
          level: 'silly'
        })
    ],
    handleExceptions: true,
    exitOnError: false
});

if (process.env.NODE_ENV == 'production' && config.logdnaKey) {
    // Setup logging for LogDNA cloud logging.
    logger.add(winston.transports.Logdna, {
        level: 'info',
        key: config.logdnaKey,
        ip: ip.address(),
        hostname: os.hostname(),
        app: 'services-discordbot'
    });
    logger.info('[logging] Started LogDNA winston transport.');
}

module.exports = logger;
