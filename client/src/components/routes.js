import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";

import TaskNew from "./tasks/new";
import TaskIndex from "./tasks/index";
import TaskShow from "./tasks/show";
import TaskEdit from "./tasks/edit";
import TaskDestroy from "./tasks/destroy";

import Register from "./sessions/register";
import Login from "./sessions/login";
import Logout from "./sessions/logout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks/new" component={TaskNew} />
      <Route exact path="/tasks/" component={TaskIndex} />
      <Route exact path="/tasks/:id" component={TaskShow} />
      <Route exact path="/tasks/:id/edit" component={TaskEdit} />
      <Route exact path="/tasks/:id/destroy" component={TaskDestroy} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  );
}

export default Routes;
