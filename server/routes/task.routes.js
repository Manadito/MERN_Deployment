// We import the controller methods from our controllers folder and the Express Third-party Library
const {
  getAllTasks,
  getOneTaskById,
  deleteOneTaskById,
  createNewTask,
  updateOneTaskById,
  updateTaskById,
  deleteAllTasks,
} = require("..//controllers/task.controller"); // We destructure this object literal to obtain createNewUser
const express = require("express"); // This imports the express library

// We create a router instance
const TaskRouter = express.Router(); // This is a class used to create modular, mountable route handlers

// We link routes with the particular controller methods (from the controllers we create in controllers.js)
TaskRouter.get("/", getAllTasks); // We can reduce "/api/tasks" to "/"
TaskRouter.get("/:id", getOneTaskById);
TaskRouter.post("/", createNewTask);
TaskRouter.put("/:id", updateOneTaskById);
TaskRouter.patch("/:id", updateTaskById);
TaskRouter.delete("/:id", deleteOneTaskById);
TaskRouter.delete("/", deleteAllTasks); // Remember to always use the correct verb

// We export the Router method we have just created
module.exports = TaskRouter;
