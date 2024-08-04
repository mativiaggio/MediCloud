// Third-party modules
import { Router } from "express";

// Internal modules
import { logger } from "../../utils/logger.js";

// Import your controllers here
// Example: import UserController from "../../controllers/user.controller.js";

// Example instantiation of controllers
// const userController = new UserController();

const clientRouter = Router();

// Middleware for public access
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/");
  next();
};

// Middleware for private access
const privateAccess = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// Middleware to attach user to request if logged in
const userMiddleware = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  next();
};

// Add your routes here
// Example:
// clientRouter.get("/", userMiddleware, async (req, res) => {
//   res.render("client/home", {
//     title: "Home",
//     description: "Welcome to our application",
//     user: req.user,
//     // Add additional data as needed
//   });
// });

clientRouter.get("/", (req, res) => {
  res.render("client/home");
});

clientRouter.get("/login", (req, res) => {
  res.render("client/auth/login");
});

export default clientRouter;
