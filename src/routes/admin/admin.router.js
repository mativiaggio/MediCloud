// Third-party modules
import { Router } from "express";

// Internal modules
import { logger } from "../../utils/logger.js";

// Import your controllers here
// Example: import UserController from "../../controllers/user.controller.js";

// Example instantiation of controllers
// const userController = new UserController();

const adminRouter = Router();

// Middleware for public access
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/admin");
  next();
};

// Middleware for private access
const privateAccess = async (req, res, next) => {
  if (!req.session.user) {
    // Example of checking if an admin user exists
    const users = await userController.isThereAnAdmin();

    if (users.status === "error") {
      logger.error(users.message);
      return res.redirect("/admin/register");
    } else {
      return res.redirect("/admin/login");
    }
  }
  next();
};

// Add your routes here
// Example:
// adminRouter.get("/", privateAccess, (req, res) => {
//   const title = "Admin Home";
//   const description = "Admin panel home page";
//   res.render("admin/home", {
//     isLoggedIn: true,
//     title,
//     description,
//     // Example: adminSidebarItems,
//   });
// });

export default adminRouter;
