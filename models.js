const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

/**
 * Mongoose schema for movies.
 * @typedef {Object} MovieSchema
 * @property {string} Title - The title of the movie.
 * @property {string} Description - The description of the movie.
 * @property {Object} Genre - The genre information of the movie.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - The description of the genre.
 * @property {Object} Director - The director information of the movie.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - The biography of the director.
 * @property {string[]} Actors - The list of actors in the movie.
 * @property {string} ImagePath - The path to the image of the movie.
 * @property {boolean} Featured - Indicates whether the movie is featured.
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Mongoose schema for users.
 * @typedef {Object} UserSchema
 * @property {string} Username - The username of the user.
 * @property {string} Password - The hashed password of the user.
 * @property {string} Email - The email of the user.
 * @property {Date} Birthday - The birthday of the user.
 * @property {mongoose.Types.ObjectId[]} FavoriteMovies - The list of favorite movies of the user.
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

/**
 * Hashes the given password.
 * @name hashPassword
 * @function
 * @memberof module:Models~UserSchema
 * @param {string} password - The password to hash.
 * @returns {string} Returns the hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates the given password.
 * @name validatePassword
 * @function
 * @memberof module:Models~UserSchema
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns true if the password is valid, false otherwise.
 */

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Mongoose model for movies.
 * @type {mongoose.Model<MovieSchema>}
 */

let Movie = mongoose.model('Movie', movieSchema);

/**
 * Mongoose model for users.
 * @type {mongoose.Model<UserSchema>}
 */
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
