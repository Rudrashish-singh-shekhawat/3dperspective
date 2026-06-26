// src/services/Logger.js

/**
 * Simple logger service that wraps console methods.
 * Can be extended to send logs to a remote server or filter by level.
 */
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

let currentLevel = LOG_LEVELS.DEBUG;

export const Logger = {
  setLevel(level) {
    if (LOG_LEVELS[level] !== undefined) {
      currentLevel = LOG_LEVELS[level];
    }
  },

  debug(...args) {
    if (currentLevel <= LOG_LEVELS.DEBUG) console.debug('[DEBUG]', ...args);
  },

  info(...args) {
    if (currentLevel <= LOG_LEVELS.INFO) console.info('[INFO]', ...args);
  },

  warn(...args) {
    if (currentLevel <= LOG_LEVELS.WARN) console.warn('[WARN]', ...args);
  },

  error(...args) {
    if (currentLevel <= LOG_LEVELS.ERROR) console.error('[ERROR]', ...args);
  },
};