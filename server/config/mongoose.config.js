const mongoose = require("mongoose"); // This imports Mongoose's external libraries
const db_name = "tasks_db"; // Saves the project name in a variable to be used below
// Mongoose will create a data base if this does not yet exist
// This sets up the connection to the Mongo DB using mongoose instance
mongoose
  .connect("mongodb://127.0.0.1/tasks_db", {
    // Try using IP 127.0.0.1 instead of "localhost" if you find the server does't work!
    useNewUrlParser: true, // Avoids deprecation warnings
    useUnifiedTopology: true, // Avoids connection errors
  })
  .then(() => console.log(`Successfully connected to ${db_name} database`))
  .catch(() => console.log(`Error connecting to ${db_name} database`, err));
