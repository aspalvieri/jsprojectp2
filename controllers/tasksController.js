const Task = require("../models/task.js");


exports.new = (req, res) => {
    req.isAuthenticated();
    res.render("tasks/new", {
        title: "New Task"
    });
};

exports.index = (req, res) => {
    req.isAuthenticated();
    Task.find({
            user: req.session.userId
        })
        .populate("user")
        .then(tasks => {
            res.render("tasks/index", {
                tasks: tasks,
                title: "Tasklist"
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/");
        });
};

exports.show = (req, res) => {
    req.isAuthenticated();
    Task.findOne({
            _id: req.params.id,
            user: req.session.userId
        })
        .then(task => {
            res.render("tasks/show", {
                title: task.title,
                task: task
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/tasks");
        });
};

exports.create = (req, res) => {
    req.isAuthenticated();
    req.body.task.user = req.session.userId;
    Task.create(req.body.task)
        .then(() => {
            req.flash("success", "Your new task was successfully created.");
            res.redirect("/tasks");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.render("tasks/new", {
                title: "New Task Post",
                task: req.body.task
            });
        });
};

exports.edit = (req, res) => {
    req.isAuthenticated();
    Task.findOne({
            _id: req.params.id,
            user: req.session.userId
        })
        .then(task => {
            res.render("tasks/edit", {
                title: `Editing: ${task.title}`,
                task: task
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/tasks");
        });
};

exports.update = (req, res) => {
    req.isAuthenticated();
    Task.updateOne({
            _id: req.body.id,
            user: req.session.userId
        }, req.body.task, {
            runValidators: true
        })
        .then(() => {
            req.flash("success", "Your task was successfully updated.");
            res.redirect("/tasks");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.render("tasks/edit", {
                title: `Editing: ${req.body.task.title}`,
                task: req.body.task
            });
        });
};

exports.destroy = (req, res) => {
    req.isAuthenticated();
    Task.deleteOne({
            _id: req.body.id,
            user: req.session.userId
        })
        .then(() => {
            req.flash("success", "The task was successfully deleted.");
            res.redirect("/tasks");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/tasks");
        });
};