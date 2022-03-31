const contactModel = require("../models/contactModel.js");

exports.index = function (req, res) {
    return res.render("contact.ejs", { contact: {} });
}

exports.register = function (req, res) {
    const contact = new contactModel(req.body);
    return contact.register()
        .then(() => {
            if (contact.errors.length > 0) {
                req.flash("errors", contact.errors);
                return req.session.save(() => res.redirect("/contact"));
            }
            req.flash("success", "Contact created sucessfully");
            return req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        })
        .catch(e => {
            console.error(e);
            res.render("500.ejs");
        });
}

exports.edit = async function (req, res) {
    const contact = await contactModel.findById(req.params?.id);
    if (!contact) return res.render("500.ejs");
    return res.render("contact.ejs", { contact })
}

exports.editContact = function (req, res) {
    const id = req.params?.id;
    if (typeof id !== "string") return;
    const contact = new contactModel(req.body);
    return contact.edit(id)
        .then(() => {
            if (contact.errors.length > 0) {
                req.flash("errors", contact.errors);
                return req.session.save(() => res.redirect(`/contact/edit/${id}`));
            }
            req.flash("success", "Contact edited sucessfully");
            return req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        })
        .catch(e => {
            console.error(e);
            res.render("500.ejs");
        });
}

exports.delete = function (req, res) {
    return contactModel.delete(req.params?.id)
        .then(() => {
            req.flash("success", "Contact sucessfully deleted");
            return req.session.save(() => res.redirect(`/`));
        })
        .catch(e => {
            console.error(e);
            res.render("500.ejs");
        });
}