import React from "react";
import _ from "lodash";

const BacklogTasksList = (props) => {
  // Destructuring props brought over from MainPage
  const { tasksList, moveTaskToInProgress } = props;

  return (
    <div className="col bg-custom-white d-flex justify-content-center align-items-start custom-styling-btl">
      <ul className="list-unstyled custom-styling-ul-items">
        {tasksList && // Creating cards and avoiding data errors with && in the process
          _.orderBy(
            _.filter(tasksList, (item) => item.status === "backlog"), // Filtering tasksList in order to keep those with an initial status of backlog (default)
            ["dueDate"],
            ["asc"]
          ).map((item, idx) => (
            <li
              className="bg-custom-white mt-2 mb-2 p-2 custom-styling-li-items"
              key={idx}
            >
              <h6>{item.project}</h6>
              {/*.Formatting the date to mm/dd/yyyy and fixing some issues I had with UTC time */}
              {(() => {
                // Gotta admit I had no idea how to fix this small date issue
                // This is resumed pretty much to using an inmediately invoked function used to process and format the dates added by the user
                // My dates were being added with the proper format but with one day off due to time zone conversion issues while using the .toLocaleDateString method
                const dueDateUTC = new Date(item.dueDate); // This creates a new Date object from item
                const offset = dueDateUTC.getTimezoneOffset(); // This calcualtes the time offset from my machine
                dueDateUTC.setMinutes(dueDateUTC.getMinutes() + offset); // This adjusts the time zone by adding the offset calculated
                // The code below sets up the formatting for months, days and years
                // 1 gets added to the month index to make it more readable while avoiding a zero-based-index representation
                const month = String(dueDateUTC.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(dueDateUTC.getDate()).padStart(2, "0");
                const year = dueDateUTC.getFullYear();
                // This is used to display the final date
                return (
                  <p>
                    Due: {month}/{day}/{year}
                  </p>
                );
              })()}
              <div className="custom-styling-btn-container-width">
                {/*. Button will execute the function, upon click, to move tasks to in progress column/component */}
                <button
                  className="custom-styling-list-btns custom-btn-color-backlog"
                  onClick={() => moveTaskToInProgress(item._id)}
                >
                  Start Project &#62;
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BacklogTasksList;
