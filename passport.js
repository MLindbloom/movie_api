const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Passport configuration for local authentication.
 * @name LocalAuthentication
 * @function
 * @param {string} usernameField - The field name for username.
 * @param {string} passwordField - The field name for password.
 * @param {Function} callback - The authentication callback function.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log('incorrect username');
            return callback(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('finished');
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    },
  ),
);

/**
 * Passport configuration for JWT authentication.
 * @name JWTAuthentication
 * @function
 * @param {Object} jwtFromRequest - JWT extraction configuration.
 * @param {string} jwtFromRequest.jwtFromRequest - Method to extract JWT token from request.
 * @param {string} secretOrKey - Secret key used for JWT verification.
 * @param {Function} callback - The authentication callback function.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    },
  ),
);
