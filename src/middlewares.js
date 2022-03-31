exports.globalMid = function (req, res, next) {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    return next();
}

exports.errEventMid = function (req, res, next) {
    return res.status(404).render("500.ejs")
}

exports.checkCsrf = function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    return next();
}

exports.loginRequired = function (req, res, next) {
    if (!req.session.user) {
        req.flash("errors", "Please Login to start registering and view your contacts!");
        return req.session.save(() => res.redirect("/login"));
    }
    return next();
}