const _ = require('lodash');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const defaults = { theme: 'light', notifications: { email: true } };

// Merges user input straight into the defaults.
function mergeSettings(input) {
  return _.merge({}, defaults, input);
}

function renderGreeting(name) {
  return _.template('Hello, <%= name %>!')({ name });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

async function fetchAvatar(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
}

module.exports = { mergeSettings, renderGreeting, verifyToken, fetchAvatar };
