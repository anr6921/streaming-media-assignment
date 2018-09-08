const fs = require('fs');
const path = require('path');

const loadFile = (req, res, filePath, contentType) => {
  // use path modules resolve function to create file object
  // does NOT load file, just creates File object based on that file
  const file = path.resolve(__dirname, filePath);

  // fs.stat function provides statistics about the file. async
  fs.stat(file, (err, stats) => {
    if (err) {
      // error code ENOENT (Error No Entry), file could not be found
      // embedded callback
      if (err.code === 'ENOENT') {
        res.writeHead(404);
      }
      return res.end(err);
    }

    // only send bytes req and valid
    let { range } = req.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    // split and parse bytes= from range header to get file size
    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`, // how much sending out of total
      'Accept-Ranges': 'bytes', // tells browser what type of data to expect the range in (bytes or none)
      'Content-Length': chunksize, // how big this chunk is
      'Content-Type': contentType, // tells browser encoding type so it can reassemble the byte
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(res);
    });

    stream.on('error', (streamErr) => {
      res.end(streamErr);
    });

    return stream;
  });
};

const getParty = (req, res) => {
  loadFile(req, res, '../client/party.mp4', 'video/mp4');
};

const getBling = (req, res) => {
  loadFile(req, res, '../client/bling.mp3', 'audio/mpeg');
};

const getBird = (req, res) => {
  loadFile(req, res, '../client/bird.mp4', 'video/mp4');
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
