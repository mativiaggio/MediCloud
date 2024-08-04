// Native modules
import path from "path";
import { fileURLToPath } from "url";

// Third-party modules
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import flash from "connect-flash";
import cors from "cors";
import chalk from "chalk";

// Internal modules
// import connect from "./db/db_connection.js"; // Uncomment the following line if you want to use MongoDB
import initializePassport from "../config/passport.config.js";
import { addLogger } from "../middlewares/addLogger.middleware.js";
import { PORT, MONGO_URI } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { setLayout } from "../middlewares/setLayout.middleware.js";
import hbs from "../config/handlebars.config.js";

// Import here your admin routes
// Example: import adminRouter from "../routes/admin/admin.router.js";

// Import here your client routes
// Example: import clientRouter from "../routes/client/client.router.js";
import clientRouter from "../routes/client/client.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express application
const app = express();

// Establish MongoDB connection
// connect(); // Uncomment the following line if you want to use MongoDB

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse cookies
app.use(cookieParser());

/* UNCOMMENT THE FOLLOWING LINE IF YOU WANT TO USE MONGODB

// Middleware to handle sessions with MongoDB storage
// app.use(
//   session({
//     secret: "ourSecret",
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: MONGO_URI,
//     }),
//   })
// );

// Middleware to handle flash messages
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.messages = req.flash();
//   next();
// });

// Initialize Passport for authentication (Uncomment when Passport is set up)
// initializePassport();
// app.use(passport.initialize());
// app.use(passport.session());

*/

// Custom middleware to add logger
app.use(addLogger);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'public' directory
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

// Set Handlebars as the view engine
const viewsPath = path.resolve(__dirname, "../views");
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", viewsPath);

// Middleware to set the default layout for Handlebars
app.use(setLayout);

// Admin routes
// Example: app.use("/api/admin/sessions", adminSessionRouter);
// Example: app.use("/admin", adminRouter);

// Client routes
// Example: app.use("/api/client/sessions", clientSessionRouter);
// Example: app.use("/", clientRouter);

app.use("/", clientRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  logger.info(chalk.blue(`Server running at http://localhost:${PORT}/`));
});
