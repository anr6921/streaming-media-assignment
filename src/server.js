const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  console.log(req.url);

  switch (req.url) {
    case '/':
      htmlHandler.getIndex(req, res, '1');
      break;
    case '/party.mp4':
      mediaHandler.getParty(req, res);
      break;
    case '/bling.mp3':
      mediaHandler.getBling(req, res);
      break;
    case '/bird.mp4':
      mediaHandler.getBird(req, res);
      break;
    case '/client':
      htmlHandler.getIndex(req, res, '1');
      break;
    case '/client2':
      htmlHandler.getIndex(req, res, '2');
      break;
    case '/client3':
      htmlHandler.getIndex(req, res, '3');
      break;
    default:
      htmlHandler.getIndex(req, res, '1');
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);
