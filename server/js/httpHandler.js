const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'POST'){
    //need to get the file that is posted and then update background.jpeg to be that file
    //var fileName = req.data;
    console.log('post going through', req);
    //req.on(data, (data) => {path.join('.',data)});
    //backgroundImageFile = path.join('.',fileName);
  } else if (req.method === 'GET') {
    // const validMessages = ['left', 'right', 'up', 'down'];
    // let randomIndex = Math.floor(Math.random()*validMessages.length);
    // res.write(validMessages[randomIndex]);
    var value = messages.dequeue();
    res.write(value || '');
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
