const fs = require('fs');

const page1 = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getIndex = (req, res, page) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  switch (page) {
    case '1':
      res.write(page1);
      break;
    case '2':
      res.write(page2);
      break;
    case '3':
      res.write(page3);
      break;
    default:
      res.write(page1);
      break;
  }
  res.end();
};

module.exports.getIndex = getIndex;
