const express = require('express')
const trailRouter = express.Router()

trailRouter.get('/data.json', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data.json');
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json(JSON.parse(data));
  });
});