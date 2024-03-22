# Movie API

## Description

This API provides users with access to information about different movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies.

## Dependencies

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express**: Back end web application framework for building RESTful APIs with Node.js.
- **MongoDB with Mongoose**: NoSQL database and Object Data Modeling library for Node.js.
- **Postman**: Allows you to design, develop, test, and monitor APIs.
- **body-parser**: Express middleware for parsing request bodies.
- **express-validator**: Middleware for input validation in Express.
- **jsonwebtoken**: Library for JWT (JSON Web Token) generation and verification.
- **lodash**: Utility library for JavaScript.
- **passport**: Authentication middleware for Node.js.
- **passport-jwt**: Passport strategy for JWT authentication.
- **passport-local**: Passport strategy for username/password authentication.
- **uuid**: Library for generating unique identifiers.

## API

MyFLix app uses [Github movie_api repository](https://github.com/MLindbloom/movie_api) to provide data about the movies. The data included for each movie includes: unique object IDs, movie title, movie description, director name, director description, genre name, and movie poster image.

### Supported Requests

|                   Request                   |                URL               | HTTP Method |
|:-------------------------------------------:|:--------------------------------:|:-----------:|
| Get List of Movies                          | /movies                          | GET         |
| Get List of Movies by Director              | /movies/directors/:directorName  | GET         |
| Get List of Movies by Genre                 | /movies/genres/:genreName        | GET         |
| Get Information about a Movie by Title      | /movies/:Title                   | GET         |
| Add a Movie                                 | /movies                          | POST        |
| Add a User                                  | /users                           | POST        |
| Update User Information                     | /users/:Username                 | PUT         |
| Add a movie to a User's Favorites List      | /users/:Username/movies/:MovieID | POST        |
| Remove a movie from a User's favorites list | /users/:Username/movies/:MovieID | DELETE      |
| Remove a User by Username                   | /users/:Username                 | DELETE      |

## Hosting

This API is hosted on Heroku.
