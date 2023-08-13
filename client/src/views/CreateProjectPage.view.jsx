import React from "react";
import { Link } from "react-router-dom";
import TasksForm from "../components/TasksForm.component";

const CreateProjectPage = () => {
  return (
    <div className="container">
      <div className="row align-items-center mb-0">
        <h1 className="col d-flex justify-content-center align-items-center">
          Project Manager
        </h1>
      </div>
      <div className="row align-items-center mb-0">
        {/* This Link takes you back to the MainPage */}
        <Link
          className="col d-flex justify-content-end align-items-center"
          to="/"
        >
          Back to Dashboard
        </Link>
      </div>
      {/* The task form is introduced below */}
      <div className="row align-items-center mb-0">
        <TasksForm />
      </div>
    </div>
  );
};

export default CreateProjectPage;
