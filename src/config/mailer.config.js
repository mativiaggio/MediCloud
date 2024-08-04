// Third-party modules
import nodemailer from "nodemailer";

// Internal modules
import { mailing } from "./env.js";

// Create a nodemailer transport using the configuration from environment variables
const mailerTransport = nodemailer.createTransport({
  service: mailing.EMAIL_SERVICE, // Email service provider
  port: mailing.EMAIL_PORT, // Port for the email service
  auth: {
    user: mailing.auth.EMAIL_USER, // Email user for authentication
    pass: mailing.auth.EMAIL_PASSWORD, // Email password for authentication
  },
});

// Export the configured nodemailer transport
export default mailerTransport;
