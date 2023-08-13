const mongoose = require("mongoose"); // We import Mongoose to use ObjectId
const TaskModel = require("../models/task.model"); // We import the model created in the .model.js file saved in the models folder
const { ObjectId } = mongoose.Types; // Destructuring assignment to get ObjectId

// We export the controller functions we will be using. Modules are components with one or more functions. These modules are exported to be used on
// some other part of the app (the tasks routes). This module provides the necessary methods to make API requests.

module.exports = {
  // Get methods
  // Method to get all tasks
  getAllTasks: (req, res) => {
    // This method consists of a key paired with an arrow function
    TaskModel.find() //
      .then((allTasks) => res.status(200).json(allTasks)) // A promise is returned by the previous mongoose method. All tasks are returned in JSON
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      ); // if it fails it returns an error
  },

  // Method to get one task by Id
  getOneTaskById: (req, res) => {
    // This method consists of a key paired with an arrow function
    TaskModel.findById(req.params.id) // This property is an object containing the property id
      .then((oneTask) => res.status(200).json(oneTask)) // A promise is returned by the previous mongoose method. The task is returned in JSON
      .catch((err) =>
        res.status(404).json({ message: "Task not found", error: err })
      ); // if it fails it returns an error
  },

  // Method to create a task
  createNewTask: (req, res) => {
    TaskModel.create(req.body) // The req.body property contains key-value pairs of data submitted in the request body.
      .then((newTask) => res.status(201).json(newTask)) // A promise is returned by the previous mongoose method. A newTask is returned in JSON
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
  },
  // Update methods
  // Method to update one Task entirely

  updateOneTaskById: async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ message: "UTID doesn't match the specified format" });

    const updateOptions = {
      new: true, // Return the updated document
      runValidators: true, // Enforce validation during update
    };

    try {
      const updatedTask = await TaskModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        updateOptions
      );
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Validation Errors", errors: err });
      }
      res.status(500).json({ message: "Something went wrong", errors: err });
    }
  },

  // Method to update one specific property. This will be used to resort to the PATCH method when moving tasks from column to column

  updateTaskById: async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "UTID doesn't match the specified format" });
    }

    const updateOptions = {
      new: true, // Return the updated document
      runValidators: true, // Enforce validation during update
    };

    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        updateOptions
      );
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Validation Errors", errors: err });
      }
      res.status(500).json({ message: "Something went wrong", errors: err });
    }
  },

  // Methods to delete data
  // Deleting one task
  deleteOneTaskById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ message: "UTID doesn't match the specified format" });

    TaskModel.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Task not found" });
        } else {
          res.status(200).json({ result: result });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  // Deleting all tasks
  deleteAllTasks: (req, res) => {
    TaskModel.deleteMany() // Mongoose method to delete everything
      .then((result) => res.status(200).json(result))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },
};
// Notice I've included all methods just in case
