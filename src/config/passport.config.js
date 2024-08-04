// Third-party modules
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";

// Internal modules
import { isValidPassword, createHash } from "../utils/passwordUtils.js";
// Import here your user model.
// Example: import User from "../models/user.js";
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } from "./env.js";

// Function to initialize passport strategies
const initializePassport = () => {
  // Local strategy for user registration
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { full_name, email, roles } = req.body;

        try {
          const user = await User.findOne({ email: username });

          if (user) {
            return done(null, false, { message: "Email is already in use" });
          }

          const hashedPassword = createHash(password);

          const newUser = await User.create({
            full_name,
            email,
            roles,
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Local strategy for user login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, {
              message: "User not found or not an admin",
            });
          }

          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Incorrect password" });
          }

          if (!user.roles.includes("admin")) {
            return done(null, false, { message: "User not an admin" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Local strategy for client registration
  passport.use(
    "client-register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { full_name, email } = req.body;

        try {
          const user = await User.findOne({ email: username });

          if (user) {
            return done(null, false, { message: "Email is already in use" });
          }

          const hashedPassword = createHash(password);

          const newUser = await User.create({
            full_name,
            email,
            roles: ["user"],
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Local strategy for client login
  passport.use(
    "client-login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // GitHub strategy for user authentication
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: CLIENT_ID,
        callbackURL: CALLBACK_URL,
        clientSecret: CLIENT_SECRET,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ email: profile._json.email });

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
            };
            const createdUser = await User.create(newUser);
            return done(null, createdUser);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialize user into the sessions
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from the sessions
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default initializePassport;
