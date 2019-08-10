const User = require("../models/user.js");

// exports.new = (req, res) => {
//     res.render("users/new", {
//         title: "New User"
//     })
// };

exports.create = (req, res) => {
    User.create(req.body.user)
        .then(() => res.status(200).send({ success: "User created" }))
        .catch(err => res.status(404).send(err));
};