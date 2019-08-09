// Our Express app module
const express = require('express');
const app = express();

// Importing the routes
const pagesRoutes = require('./routes/pages.js');
const tasksRoutes = require('./routes/tasks.js');
const usersRoutes = require('./routes/users.js');
const sessionsRoutes = require('./routes/sessions.js');

// Registering our pageRoutes
app.use('/', pagesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);
app.use("/", sessionsRoutes);

// Exporting the changes
module.exports = app;
