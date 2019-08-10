import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/tasks/${props.match.params.id}`)
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/tasks/update", {
      id: props.match.params.id,
      task: {
        title: inputs.title,
        description: inputs.description,
        status: inputs.status
      }
    })
      .then(() => setRedirect(true))
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) return <Redirect to="/tasks" />;

  if (inputs.title && inputs.description && inputs.status) {
    return (
        <div className="container">
        <header>
            <h1 style={{textAlign: "center"}}>Edit Task</h1>
        </header>
        <div>
            <form action="/tasks" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                className="form-control"
                name="title"
                required="required"
                onChange={handleInputChange}
                defaultValue={inputs.title}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                className="form-control"
                name="description"
                onChange={handleInputChange}
                defaultValue={inputs.description}
                />
            </div>

            <div className="form-group">
                <label>Status</label>
                <select
                className="form-control"
                name="status"
                required="required"
                onChange={handleInputChange}
                defaultValue={inputs.status}
                >
                <option value="NOT STARTED">NOT STARTED</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="COMPLETE">COMPLETE</option>
                </select>
            </div>

            <div className="form-group">
                <button className="btn btn-dark" type="submit">
                Submit
                </button>
            </div>
            </form>
        </div>
        </div>
    );
  }
  return <p>Loading...</p>;
}

export default Edit;
