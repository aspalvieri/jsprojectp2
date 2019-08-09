const User = require("../models/user.js");

exports.new = (req, res) => {
    res.render("users/new", {
        title: "New User"
    })
};

exports.create = (req, res) => {
    User.create(req.body.user)
        .then(() => {
            req.flash("success", "You are now registered.");
            res.redirect("/login");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("users/new");
        });
};