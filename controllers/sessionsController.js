const User = require("../models/user.js");

exports.login = (req, res) => {
    res.render("sessions/login", {
        title: "Login"
    });
};

exports.authenticate = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user)
                throw new Error("Your credentials don't match.");
            user.authenticate(req.body.password, (err, isMatch) => {
                if (err)
                    throw new Error(err);

                if (isMatch) {
                    req.session.userId = user.id;
                    req.flash("success", "You are now logged in.");
                    res.redirect("/tasks");
                }
                else {
                    req.flash("error", "Your credentials don't match.");
                    res.redirect("/login");
                }
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/login");
        });
};

exports.logout = (req, res) => {
    req.session.userId = null;
    req.flash("success", "You are now logged out.");
    res.redirect("/");
};