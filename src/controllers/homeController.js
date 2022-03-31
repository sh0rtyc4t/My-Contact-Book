const { getAll } = require("../models/contactModel.js");

exports.index = async function (req, res) {
    return res.render("index.ejs", { contactList: await getAll(res.locals.user?._id) });
};