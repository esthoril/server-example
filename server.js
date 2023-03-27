const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
//const cors = require('cors');

const app = express()
const port = 3000

// CORS
//app.use(cors());

// Static Files
app.use(express.static('public'))
app.use('/json', express.static(__dirname + 'public/json'))

app.get('/json/data.json', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data.json');
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json(JSON.parse(data));
  });
});


//app.use(bodyParser.urlencoded({ extended: true }))

// Routes
//const trailRouter = require('./src/routes/trails')
//app.use('/', trailRouter)
//app.use('/article', newsRouter)


// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))