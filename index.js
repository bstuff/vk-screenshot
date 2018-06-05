#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');
const queryString = require('query-string');
const exec = require('child_process').execSync;

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const readBuffer = exec(path.join(__dirname, 'pngpaste -'));

const formData = new FormData();
formData.append('photo', readBuffer, 'photo.png');

const getHeaders = (form) => new Promise((resolve, reject) => {
  form.getLength((err, length) => {
    if (err) { reject(err); }
    let headers = Object.assign({ 'Content-Length': length }, form.getHeaders());
    resolve(headers);
  });
});

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const postPhoto = async () => {
  const uploadServer = await axios.get(`https://api.vk.com/method/photos.getMessagesUploadServer?${queryString.stringify({
    v: '5.17',
    access_token: ACCESS_TOKEN,
  })}`);
  const uploadUrl = uploadServer.data.response.upload_url;
  const headers = await getHeaders(formData);

  const uploadRes = await axios.post(uploadUrl, formData, {
    headers,
  }).catch(e => { console.log(e) });

  const savePhotoRes = await axios.get(`https://api.vk.com/method/photos.saveMessagesPhoto?${queryString.stringify({
    v: '5.17',
    access_token: ACCESS_TOKEN,
    server: uploadRes.data.server,
    photo: uploadRes.data.photo,
    hash: uploadRes.data.hash,
  })}`).catch(e => { console.log(e) });

  const imgurl = Object.entries(savePhotoRes.data.response[0]).filter(e => /photo/.test(e[0])).pop()[1];

  process.stdout.write(imgurl);
  process.exit(0);
};

postPhoto();
