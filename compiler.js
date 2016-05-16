'use strict';

require('babel-polyfill');
require('babel-core/register');

global.Tracker = {
  autorun: require('lodash').noop
};
