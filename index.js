const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

let users = [
  {
    id: 1,
    name: 'Lyla',
    favoriteMovies: ['Interstellar'],
  },
  {
    id: 2,
    name: 'Lyss',
    favoriteMovies: ['The Holiday'],
  },
  {
    id: 3,
    name: 'Mike',
    favoriteMovies: ['Avengers: Endgame'],
  },
];

let movies = [
  {
    Title: 'Interstellar',
    Year: '2014',
    Genre: {
      Name: 'Science Fiction',
      Description:
        'Science fiction, popularly shortened as sci-fi, is a genre of fiction that creatively depicts real or imaginary science and technology as part of its plot, setting, or theme.',
    },
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'Christopher Nolan (born July 30, 1970, London, England) British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. Nolan was raised by an American mother and a British father, and his family spent time in both Chicago and London. As a child, he attended Haileybury, a boarding school just outside London.',
      Birth: '1970',
    },
  },
  {
    Title: 'The Holiday',
    Year: '2006',
    Genre: {
      Name: 'Romantic Comedy',
      Description:
        'Romantic comedy is a subgenre of comedy and romance fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
    },
    Director: {
      Name: 'Nancy Meyers',
      Bio: 'Nancy Meyers (born December 8, 1949, Philadelphia, Pennsylvania, U.S.) American writer, director, and producer who was best known for her romantic comedies, several of which centre on middle-aged women. Meyers grew up in the Philadelphia area. After studying journalism at American University (B.A., 1970), she moved to Los Angeles to begin a career in the entertainment industry.',
      Birth: '1949',
    },
  },
  {
    Title: 'Avengers: Endgame',
    Year: '2019',
    Genre: {
      Name: 'Action',
      Description:
        'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, an indestructible villain, or a pursuit which usually concludes in victory for the hero.',
    },
    Director: {
      Name: 'Anthony Russo, Joe Russo',
      Bio: 'Anthony Russo and Joseph Russo, collectively known as the Russo brothers (ROO-soh), are American directors, producers, and screenwriters. Anthony Russo (born February 3, 1970) and Joseph Russo (born July 18, 1971) were born and raised in Cleveland, Ohio, the sons of Patricia Gallupoli and attorney and judge Basil Russo. Their parents were both of Italian descent. Their paternal and maternal families emigrated from Sicily and Abruzzo, respectively, and settling in Ohio. They attended Benedictine High School.[6] Joe graduated from the University of Iowa and majored in English and writing, while Anthony graduated from the University of Pennsylvania and majored in business before switching to English.',
      Birth: '1970, 1971',
    },
  },
  {
    Title: 'Top Gun: Maverick',
    Year: '2022',
    Genre: {
      Name: 'Action',
      Description:
        'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, an indestructible villain, or a pursuit which usually concludes in victory for the hero.',
    },
    Director: {
      Name: 'Joseph Kosinski',
      Bio: 'Joseph Kosinski (born May 3, 1974) is an American film director, best known for his computer graphics and computer-generated imagery (CGI) work, and for his work in action films. Kosinski grew up in Marshalltown, Iowa, the son of Patricia (née Provost) of French-Canadian descent, and Joel Kosinski, a doctor of Polish descent.',
      Birth: '1974',
    },
  },
  {
    Title: 'The Hangover',
    Year: '2009',
    Genre: {
      Name: 'Comedy',
      Description:
        'Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.',
    },
    Director: {
      Name: 'Todd Phillips',
      Bio: "Todd Phillips (born Todd Philip Bunzl; born December 20, 1970) is an American filmmaker and film producer. Phillips began his career in 1993 and directed films in the 2000s such as Road Trip, Old School, Starsky & Hutch, and School for Scoundrels. He came to wider prominence in the early 2010s for directing The Hangover film series. Phillips was born in Brooklyn, New York City, to a Jewish family. He was raised in Dix Hills, New York, on Long Island. He attended New York University Film School, but dropped out because he could not afford to complete his first film and pay tuition simultaneously. Around that time, he worked at Kim's Video and Music.",
      Birth: '1970',
    },
  },
  {
    Title: 'Inception',
    Year: '2010',
    Genre: {
      Name: 'Action',
      Description:
        'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, an indestructible villain, or a pursuit which usually concludes in victory for the hero.',
    },
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'Christopher Nolan (born July 30, 1970, London, England) British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives. Nolan was raised by an American mother and a British father, and his family spent time in both Chicago and London. As a child, he attended Haileybury, a boarding school just outside London.',
      Birth: '1970',
    },
  },
  {
    Title: 'The Lord of the Rings: Return of the King',
    Year: '2001',
    Genre: {
      Name: 'High Fantasy',
      Description:
        'High fantasy, or epic fantasy, is a subgenre of fantasy defined by the epic nature of its setting or by the epic stature of its characters, themes, or plot. High fantasy is set in an alternative, fictional ("secondary") world, rather than the "real" or "primary" world. This secondary world is usually internally consistent, but its rules differ from those of the primary world.',
    },
    Director: {
      Name: 'Peter Jackson',
      Bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Jackson was born on 31 October 1961 in Wellington and was raised in its far northern suburb of Pukerua Bay. His parents – Joan (née Ruck), a factory worker and housewife, and William "Bill" Jackson, a wages clerk – were immigrants from England.',
      Birth: '1961',
    },
  },
  {
    Title: 'Rogue One',
    Year: '2016',
    Genre: {
      Name: 'Action',
      Description:
        'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, an indestructible villain, or a pursuit which usually concludes in victory for the hero.',
    },
    Director: {
      Name: 'Gareth Edwards',
      Bio: 'Gareth James Edwards is an English filmmaker. Gareth Edwards was born on 13 July 1975 in Nuneaton, Warwickshire. He is of Welsh parentage. Edwards wanted to direct his own films since childhood, stating that "Star Wars is definitely the reason that I wanted to become a filmmaker". He attended Higham Lane School, followed by college at North Warwickshire College of Technology and Art (now NWSLC), completing a BTEC National Diploma in Audio Visual Studies under lecturers such as Graham Bird. Edwards studied film and video at the Surrey Institute of Art & Design, University College in Farnham, graduating in 1996. In 2012, he received an honorary Master of Arts from UCA.',
      Birth: '1975',
    },
  },
  {
    Title: 'Harry Potter and the Deathly Hallows: Part 2',
    Year: '2011',
    Genre: {
      Name: 'Fantasy',
      Description:
        'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.',
    },
    Director: {
      Name: 'David Yates',
      Bio: "David Yates is an English filmmaker, who has directed feature films, short films, and television productions. He is best known for directing the final four films in the Harry Potter series and the three films of its prequel series, Fantastic Beasts. David was born on 8 October 1963 in St Helens, Lancashire, England. His parents died when he was young. Raised in the village of Rainhill, Yates was inspired to pursue a career in filmmaking after watching Steven Spielberg's 1975 movie Jaws. Yates's mother bought him a Super 8mm camera. He used this to shoot various films in which his friends and family featured.",
      Birth: '1963',
    },
  },
  {
    Title: 'Pirates of the Caribbean: At World’s End',
    Year: '2007',
    Genre: {
      Name: 'Action',
      Description:
        'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, an indestructible villain, or a pursuit which usually concludes in victory for the hero.',
    },
    Director: {
      Name: 'Gore Verbinski',
      Bio: 'Gregor Justin "Gore" Verbinski (born March 16, 1964) is an American film director. Verbinski was born in Oak Ridge, Tennessee, the fourth of five children of Laurette Ann (née McGovern) and Victor Vincent Verbinski, a nuclear physicist. His father was of Polish descent.',
      Birth: '1964',
    },
  },
];

//CREATE NEW USER
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('User name required.');
  }
});

//UPDATE USER NAME
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No user found.');
  }
});

//DELETE USER
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted.`);
  } else {
    res.status(400).send('No user found.');
  }
});

//CREATE FAVORITE MOVIE LIST
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array!`);
  } else {
    res.status(400).send('No user found.');
  }
});

//DELETE FAVORITE MOVIE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = user.find((user) => user.id == id);
  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle,
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array!`);
  } else {
    res.status(400).send('No user found.');
  }
});

//READ INDEX PAGE
app.get('/', function (req, res, next) {
  res.send('Welcome to movie app!');
});

//READ MOVIE LIST
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//READ MOVIES BY TITLE
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No movie found.');
  }
});

//READ GENRES BY NAME
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No genre found.');
  }
});

//READ DIRECTORS BY NAME
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName,
  ).Director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('No director found.');
  }
});

app.use(morgan('combined', { stream: log }));
app.use(express.static(path.join(__dirname, 'public')));

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log('Your app is listening to port 8080.'));
