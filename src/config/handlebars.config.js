// Third-party modules
import exphbs from "express-handlebars";

// Internal modules
import { getPath } from "../utils/functions.js";

// Initialize Handlebars with a basic example configuration
const hbs = exphbs.create({
  helpers: {
    // Example helper to format a date
    formatDate: function (date) {
      return new Date(date).toLocaleDateString("es-ES");
    },
  },
  // Example default layout and directories configuration
  defaultLayout: "main",
  layoutsDir: getPath("views/layouts"),
  partialsDir: getPath("views/partials"),
});

export default hbs;
