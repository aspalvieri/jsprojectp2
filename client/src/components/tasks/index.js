import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.get("/api/tasks")
      .then(result => setTasks(result.data)) // Our tasks are under the property .data
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1 style={{textAlign: "center"}}>All tasks</h1>
      </header>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>
                  <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                </td>
                <td className={(task.status).replace(" ", "_")}>{task.status}</td>
                <td>
                  <Link to={`/tasks/${task._id}/edit`}>Edit</Link> |&nbsp;
                  <Link to={`/tasks/${task._id}/destroy`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
