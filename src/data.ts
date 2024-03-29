import * as fs from 'fs';
import state from './state';
import logger from './logging';
import { IResponses } from './models/interfaces';

const responses: { [index: string]: IResponses } = {
  citra: require('./responses/citra.json'),
  yuzu: require('./responses/yuzu.json')
};

export function readWarnings () {
  // Load the warnings file into the application state.
  const readFilePath = '/data/discordWarnings.json';
  fs.readFile(readFilePath, 'utf8', function (err, data) {
    if (err) { throw err; }
    if (data) {
      state.warnings = JSON.parse(data);
      logger.debug('Loaded warnings file.');
    } else {
      logger.warn(`${readFilePath} appears to be an empty file.`);
    }
  });
}

export function readBans () {
  // Load the ban file into the application state.
  const readFilePath = '/data/discordBans.json';
  fs.readFile(readFilePath, 'utf8', function (err, data) {
    if (err) { throw err; }
    if (data) {
      state.bans = JSON.parse(data);
      logger.debug('Loaded bans file.');
    } else {
      logger.warn(`${readFilePath} appears to be an empty file.`);
    }
  });
}

export function readCustomResponses () {
  // Load the responses file into the responses variable.
  if (process.env.TENANT) {
    state.responses = responses[process.env.TENANT];
    if (state.responses) {
      logger.debug(`Loaded responses file for ${process.env.TENANT} from external source.`);
      return;
    }
  }
  logger.error(`Failed to load ${process.env.TENANT}.json! Custom responses are disabled.`);
}

export function flushWarnings () {
  const warningsJson = JSON.stringify(state.warnings, null, 4);
  fs.writeFile('/data/discordWarnings.json', warningsJson, 'utf8', function (err) {
    if (err) { throw err; }
  });
}

export function flushBans () {
  const bansJson = JSON.stringify(state.bans, null, 4);
  fs.writeFile('/data/discordBans.json', bansJson, 'utf8', function (err) {
    if (err) { throw err; }
  });
}
