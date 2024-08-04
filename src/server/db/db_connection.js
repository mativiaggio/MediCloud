// Third-party modules
import mongoose from "mongoose";
import chalk from "chalk";

// Internal modules
import { logger } from "../../utils/logger.js";
import { MONGO_URI } from "../../config/env.js";

// Function to establish a connection to MongoDB using Mongoose
const connect = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        // Log success message on successful connection
        logger.info(chalk.blue("Mongoose connected \n"));
      })
      .catch((err) => {
        // Log error message if connection fails
        logger.error(chalk.red(`Mongoose connection error: ${err.message}`));
      });
  } catch (err) {
    // Handle any other errors during the connection process
    logger.error(chalk.red(`Mongoose connection error: ${err.message}`));
    process.exit(1); // Exit the process with failure code
  }
};

// Export the connect function as the default export
export default connect;
