import React from "react";

function Home() {
    return(
        <div className="container">
            <header>
                <h1 style={{textAlign: "center"}}>Task Manager</h1>
            </header>
            <p>
                The Task Manager website allows you to create, edit, upload, and delete a list of tasks. Define your tasks using a name
                to summarize what the task is, a description explaining what needs to be done, and the status of the task (not started, in progress,
                and complete). Login or Register to get started. . .
            </p>
        </div>
    );
}

export default Home;
