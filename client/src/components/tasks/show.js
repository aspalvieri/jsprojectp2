import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
  const [task, setTask] = useState({});

  useEffect(() => {
    Axios.get(`/api/tasks/${props.match.params.id}`)
      .then(result => setTask(result.data))
      .catch(err => console.error(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1>{task.title}</h1>
      </header>

      <div>{task.description}</div>
      <div>{task.status}</div>
    </div>
  );
}

export default Show;
