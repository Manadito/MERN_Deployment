const express = require("express"); // This imports the express library
const cors = require("cors"); // This imports the CORS middleware. Install it by typing "npm install cors" in your git terminal

const app = express(); // This initializes the express instance app with all its methods
const port = process.env.PORT; // We define an auxiliary variable to save our port data in

app.use(express.json()); // Enable middleware to read JSON
app.use(express.urlencoded({ extended: true })); // Enable middleware to parse url encoded data

//------------------------------------------------------------------------------------------------------
// Configuring cors in Express instance ('app')
// This middleware will enable CORS.
// The CORS mechanism allows restricted resources on a web page to be accessed from another domain
// outside the domain from which the first resource was served.

const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  methods: "GET, POST, PUT, PATCH, DELETE", // Allow these methods
};
app.use(cors(corsOptions));

require("./config/mongoose.config"); // This calls the Mongoose Config file ... remember to have mongo running

// --------------------------------------------------------------------------------------------------------------------------------------
// Here we take the router instance from step 5 and import it over

const TaskRouter = require("./routes/task.routes");
app.use("/api/tasks", TaskRouter);

// --------------------------------------------------------------------------------------------------------------------------------------

app.listen(port, () => console.log(`Listening on port: ${port}`)); // Used to bind and listen to the connections on the specified host and port
