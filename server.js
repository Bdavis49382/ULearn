/**
 * Imports
 */
import configNodeEnv from "./src/middleware/node-env.js";
import express from "express";
import fileUploads from "./src/middleware/file-uploads.js";
import homeRoute from "./src/routes/index.js";
import authRoute from "./src/routes/auth/auth.js";
import activityRoute from "./src/routes/activity/activity.js";
import courseRoute from "./src/routes/course/course.js";
import layouts from "./src/middleware/layouts.js";
import path from "path";
import { configureStaticPaths, setupWebSocket } from "./src/utils/index.js";
import { fileURLToPath } from "url";
import { setupDatabase } from "./src/models/index.js";

/**
 * Global Variables
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = process.env.NODE_ENV;
const port = process.env.PORT;

/**
 * Create and configure the Express server
 */
const app = express();

// Configure the application based on environment settings
app.use(configNodeEnv);

// Configure static paths (public dirs) for the Express application
configureStaticPaths(app);

// Set EJS as the view engine and record the location of the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Set Layouts middleware to automatically wrap views in a layout and configure default layout
app.set("layout default", "default");
app.set("layouts", path.join(__dirname, "src/views/layouts"));
app.use(layouts);

// Middleware to process multipart form data with file uploads
app.use(fileUploads);

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse URL-encoded form data (like from a standard HTML form)
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use("/", homeRoute);
app.use("/auth/", authRoute);
app.use("/activity/", activityRoute);
app.use("/course/", courseRoute);

/**
 * Start the server
 */

// When in development mode, start a WebSocket server for live reloading
if (mode.includes("dev")) {
    setupWebSocket(port);
}

// Start the Express server
app.listen(port, async () => {
//   await setupDatabase();
  console.log(`Server running on http://127.0.0.1:${port}`);
});
