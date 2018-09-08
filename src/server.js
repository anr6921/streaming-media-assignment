const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  console.log(req.url);

  switch(req.url){
    case '/':
        htmlHandler.getIndex(req, res);
        break;
    case '/party.mp4':
        mediaHandler.getParty(req, res);
        break;
    default:
        htmlHandler.getIndex(req, res);
        break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);

