const mongoose = require("mongoose"); // Import library to use its methods and custom functionalities to manipulate MongoDB docs
const uniqueValidator = require("mongoose-unique-validator");

const TaskSchema = new mongoose.Schema( // Creating our schema (blueprint)
  {
    project: {
      type: String,
      unique: true, // unique validator added to later show on client side
      required: [true, "Project is required"],
      minlength: [3, "Project must at least be 3 characters long"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    status: {
      type: String,
      default: "backlog", // Set this to default to use it later in the client to filter lists on every list component
    },
  },
  { timestamp: true } // This will add to our data 'createdAt' and 'updatedAt' key-value pairs everytime we create/change something
);

// This plugin allows us to use the unique validator and is crucial for the error to show on the client
TaskSchema.plugin(uniqueValidator, {
  message: "Project must be unique",
});

const TaskModel = mongoose.model("Task", TaskSchema); // We define our model as a variable

module.exports = TaskModel; // We export our model
