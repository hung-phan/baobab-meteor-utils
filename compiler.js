'use strict';

require('babel-polyfill');
require('babel-core/register');
const _ = require('lodash');

global.Tracker = {
  autorun: _.noop
};
