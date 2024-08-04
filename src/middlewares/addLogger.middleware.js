// Third-party modules
import chalk from "chalk";

// Internal modules
import { NODE_ENV } from "../config/env.js";
import { logger, prodLogger, devLogger } from "../utils/logger.js";

// Middleware to add logger to the request object based on the environment
export const addLogger = (req, res, next) => {
  // Set the appropriate logger based on the environment
  if (NODE_ENV === "production") {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }

  // Function to get the appropriate color for the status code
  const getColorForStatusCode = (statusCode, message) => {
    if (statusCode >= 500) {
      return chalk.red(message);
    } else if (statusCode >= 400) {
      return chalk.yellow(message);
    } else if (statusCode >= 300) {
      return chalk.cyan(message);
    } else if (statusCode >= 200) {
      return chalk.green(message);
    } else {
      return chalk.white(message);
    }
  };

  // Function to log the request details
  const logRequest = () => {
    const message = `${req.method} (${res.statusCode}) to ${
      req.url
    } - ${new Date().toLocaleString()}`;
    const coloredMessage = getColorForStatusCode(res.statusCode, message);
    req.logger.http(coloredMessage);
  };

  // Attach the logRequest function to the 'finish' event of the response
  res.on("finish", logRequest);

  // Proceed to the next middleware
  next();
};
