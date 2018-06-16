#!/usr/bin/env node

const queryString = require('query-string');

console.log(`https://oauth.vk.com/authorize?${queryString.stringify({
  client_id: '',
  redirect_uri: 'blank.html',
  scope: 'messages,offline,photos',
  display: 'page',
  v: '5.17',
  response_type: 'token',
  revoke: '1',
})}`);
