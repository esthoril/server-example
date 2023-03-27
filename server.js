const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const cors = require('cors');

const app = express()
const port = 3000

// CORS
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT', 'POST'], // allow GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'] // allow requests with these headers
}));


// Static Files
app.use(express.static('public'))
app.use('/json', express.static(__dirname + 'public/json'))

app.get('/json/data.json', (req, res) => {
  fs.readFile('/json/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data.json');
      return;
    }

    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET,PUT');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json(JSON.parse(data));
  });
});

// Route to handle PUT requests to update the JSON file
app.put('/json/data.json', (req, res) => {
  fs.writeFile('/json/data.json', JSON.stringify(req.body), 'utf8', err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing to data.json');
      return;
    }

    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //res.setHeader('Access-Control-Allow-Methods', 'GET,PUT');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.json(req.body);
  });
});

//app.use(bodyParser.urlencoded({ extended: true }))

// Routes
//const trailRouter = require('./src/routes/trails')
//app.use('/', trailRouter)
//app.use('/article', newsRouter)


// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))