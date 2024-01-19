const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');

const app = express();

let topMovies = [
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014',
  },
  {
    title: 'The Holiday',
    director: 'Nancy Meyers',
    year: '2006',
  },
  {
    title: 'Avenger: Endgame',
    director: 'Anthony Russo, Joe Russo',
    year: '2019',
  },
  {
    title: 'Top Gun: Maverick',
    director: 'Joseph Kosinski',
    year: '2022',
  },
  {
    title: 'The Hangover',
    director: 'Todd Phillips',
    year: '2009',
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    year: '2010',
  },
  {
    title: 'The Lord of the Rings: Return of the King',
    director: 'Peter Jackson',
    year: '2001',
  },
  {
    title: 'Rogue One',
    director: 'Gareth Edwards',
    year: '2016',
  },
  {
    title: 'Harry Potter and the Deathly Hallows: Part 2',
    director: 'David Yates',
    year: '2011',
  },
  {
    title: 'Pirates of the Caribbean: At World’s End',
    director: 'Gore Verbinski',
    year: '2007',
  },
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening to port 8080.');
});
