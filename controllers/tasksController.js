const Task = require("../models/task.js");


// exports.new = (req, res) => {
//     req.isAuthenticated();
//     res.render("tasks/new", {
//         title: "New Task"
//     });
// };

exports.index = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Task.find({
            user: req.session.userId
        })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json(err));
};

exports.show = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Task.findOne({
            _id: req.params.id,
            user: req.session.userId
        })
        .then(task => res.json(task))
        .catch(err => res.status(404).json(err));
};

exports.create = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    req.body.task.user = req.session.userId;

    Task.create(req.body.task)
        .then(() => res.status(200).send({ success: "Task created" }))
        .catch(err => res.status(404).send(err));
};

exports.edit = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Task.findOne({
            _id: req.params.id,
            user: req.session.userId
        })
        .then(task => res.send(task))
        .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Task.updateOne({
            _id: req.body.id,
            user: req.session.userId
        }, req.body.task, {
            runValidators: true
        })
        .then(() => res.status(200).send({ success: "Task updated" }))
        .catch(err => res.status(404).send(err));
};

exports.destroy = (req, res) => {
    if (!req.isAuthenticated())
        return res.status(401).send({ error: "Not Authenticated" });

    Task.deleteOne({
            _id: req.body.id,
            user: req.session.userId
        })
        .then(() => res.status(200).send({ success: "Task deleted" }))
        .catch(err => res.status(404).send(err));
};