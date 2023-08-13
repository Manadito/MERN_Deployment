import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BacklogTasksList from "../components/BacklogTasksList.component";
import InProgressTasksList from "../components/InProgressList.component";
import CompletedTasksList from "../components/CompletedTasksList.component";
import { baseUrl } from "../config";

const MainPage = () => {
  // Creating the useState Hook

  const [tasksList, setTasksList] = useState(); // Creatng a state to update the tasks list

  // Calling the API to store data values in tasksList
  useEffect(() => {
    getAllTasks();
  }, []);
  // Auxiliary function

  const getAllTasks = async () => {
    try {
      let res = await axios.get(`${baseUrl}/api/tasks/`);
      setTasksList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // This function will edit the status from the default backlog to inProgress
  // This will help filter the backlog list and move items to the other column
  const moveTaskToInProgress = (taskId) => {
    axios
      .patch(`${baseUrl}/api/tasks/${taskId}`, {
        status: "inProgress",
      })
      .then(() => {
        setTasksList((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: "inProgress" } : task
          )
        );
      });
  };
  // This function will edit the status from the default inProgress to completed
  // This will help filter the inProgress list and move items to the other column
  const moveTaskToCompleted = (taskId) => {
    axios
      .patch(`${baseUrl}/api/tasks/${taskId}`, {
        status: "completed",
      })
      .then(() => {
        setTasksList((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: "completed" } : task
          )
        );
      });
  };
  // This will remove the task from MongoDB and then update the state
  const removeTask = (taskId) => {
    axios.delete(`${baseUrl}/api/tasks/${taskId}`).then(() => {
      setTasksList((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    });
  };

  return (
    <div className="container">
      <div className="row align-items-center mb-0">
        <h1 className="col d-flex justify-content-center align-items-center">
          Project Manager
        </h1>
      </div>
      {/* Div container below with three columns for styling purposes */}
      <div className="row align-items-center mb-0">
        <div className="col bg-custom-blue d-flex justify-content-center align-items-center custom-styling-backlog-header">
          <h2>Backlog</h2>
        </div>
        <div className="col bg-custom-yellow d-flex justify-content-center align-items-center custom-styling-inprogress-header">
          <h2>In Progress</h2>
        </div>
        <div className="col bg-custom-green d-flex justify-content-center align-items-center custom-styling-completed-header ">
          <h2>Completed</h2>
        </div>
      </div>

      {/* Container below with three columns organized as such for styling purposes */}
      {/* The three task component follow */}
      <div className="row align-items-center mb-0">
        <BacklogTasksList
          tasksList={tasksList}
          moveTaskToInProgress={moveTaskToInProgress}
        />
        <InProgressTasksList
          tasksList={tasksList}
          moveTaskToCompleted={moveTaskToCompleted}
        />
        <CompletedTasksList tasksList={tasksList} removeTask={removeTask} />
      </div>
      <div className="row align-items-center mb-0 bg-custom-green custom-styling-bottombar">
        <div className="custom-styling-addbtn-container-width">
          <button className="custom-btn-color-add custom-styling-addbtn-width">
            <Link className="custom-styling-link" to={"/tasks/new"}>
              + Add New Project
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
