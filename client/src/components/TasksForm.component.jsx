import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { baseUrl } from "../config";

const TasksForm = () => {
  // Defining the state by using useState
  const [task, setTask] = useState({
    project: "",
    dueDate: "",
  });
  // Defining the state for the errors using useState
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  // This function will update the state of task based on the user's inputs
  const onChangeTaskDetailsHandler = (e) => {
    let taskToUpdate = { ...task };
    taskToUpdate[e.target.name] = e.target.value;
    setTask(taskToUpdate);
  };

  // Once the form is submitted, the addTasks function will get executed obtaining the data from the API
  const onSubmitTaskDetailsHandler = (e) => {
    e.preventDefault();
    addTasks();
  };
  // Axios function to fetch data from Mongo data base through a connection with the server
  const addTasks = async () => {
    try {
      let res = await axios.post(`${baseUrl}/api/tasks`, task);
      navigate("/"); // This will send the user back to the Main Page
    } catch (err) {
      console.log(err);
      updateErrorMessages(err);
    }
  };

  // Error messages auxiliary function

  const updateErrorMessages = (err) => {
    //console.log(err.response.data);
    let errors = err.response.data.errors?.errors;
    let errorMesagesToUpdate = _.mapValues(errors, (error) => {
      return error.message;
    });
    setErrorMessages(errorMesagesToUpdate);
  };

  return (
    <div className="col d-flex justify-content-center align-items-center border border-black border-2 p-3">
      <form className="row" onSubmit={onSubmitTaskDetailsHandler}>
        <div className="col-md-12 form-group mb-3">
          <div className="d-flex align-items-center">
            <label htmlFor="project" className="custom-label-bold mr-2">
              Project
            </label>
            {/* Project input */}
            <input
              type="text"
              id="project"
              name="project"
              value={task.project}
              onChange={onChangeTaskDetailsHandler}
              className="form-control"
            />
          </div>
          {/* Print product errors */}
          <div className="col d-flex justify-content-center align-items-center">
            {_.has(errorMessages, "project") && (
              <div className="text-danger small">{errorMessages.project}</div>
            )}
          </div>
        </div>
        <div className="col-md-12 form-group mb-3">
          <div className="d-flex align-items-center">
            <label htmlFor="dueDate" className=" custom-label-bold mr-2">
              Due Date
            </label>
            {/* Date input */}
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={onChangeTaskDetailsHandler}
              className="form-control"
            />
          </div>
          {/* Print date errors */}
          <div className="col d-flex justify-content-center align-items-center">
            {_.has(errorMessages, "dueDate") && (
              <div className="text-danger small">{errorMessages.dueDate}</div>
            )}
          </div>
        </div>
        <div className="col-md-12 text-center custom-styling-planbtn-width">
          <button className="custom-styling-planbtn" type="submit">
            Plan Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default TasksForm;
