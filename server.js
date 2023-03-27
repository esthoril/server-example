const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()
const port = 3000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.get('/data.json', (req, res) => {
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


//app.use(bodyParser.urlencoded({ extended: true }))

// Routes
//const trailRouter = require('./src/routes/trails')
//app.use('/', trailRouter)
//app.use('/article', newsRouter)


// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))