#!/usr/bin/env node

const queryString = require('query-string');

console.log(`https://oauth.vk.com/authorize?${queryString.stringify({
  client_id: '',
  client_secret: 'http://localhost',
  redirect_uri: 'http://localhost',
  code: 'page',
})}`);
 