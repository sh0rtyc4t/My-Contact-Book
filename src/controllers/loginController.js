const LoginModel = require("../models/loginModel.js");

exports.index = function (req, res) {
    if (req.session.user) return res.redirect("/");
    return res.render("login.ejs");
};

exports.register = function (req, res) {
    const login = new LoginModel(req.body);
    return login.register()
        .then(() => {
            if (login.hasErrors) {
                req.flash("errors", login.errors);
                return req.session.save(() => res.redirect("/login"));
            }
            return enter(req, res);
        })
        .catch(e => {
            console.error(e);
            res.render("500.ejs");
        });
}

function enter (req, res) {
    const login = new LoginModel(req.body);
    return login.enter()
        .then(() => {
            if (login.hasErrors) {
                req.flash("errors", login.errors);
                return req.session.save(() => res.redirect("/login"));
            }
            req.flash("success", `Hello ${login.user.name}, welcome to My Contact Book`);
            req.session.user = login.user;
            return req.session.save(() => res.redirect("/"));
        })
        .catch(e => {
            console.error(e);
            res.render("500.ejs");
        });
}

exports.enter = enter;

exports.logout = function (req, res) {
    req.flash("success", "Successfully logout");
    req.session.destroy();
    return res.redirect("/");
}