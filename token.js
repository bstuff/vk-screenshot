#!/usr/bin/env node

const queryString = require('query-string');

console.log(`https://oauth.vk.com/authorize?${queryString.stringify({
  client_id: '',
  redirect_uri: 'http://localhost:3000',
  scope: 'offline',
  display: 'page',
  response_type: 'code',
})}`);
 