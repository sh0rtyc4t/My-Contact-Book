const { Schema, model } = require("mongoose");
const validator = require("validator");

const contactSchema = new Schema({
    email: { type: String, default: "" },
    name: { type: String, required: true },
    lastName: { type: String, default: "" },
    telephone: { type: String, default: "" },
    ownerID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});
const contactModel = model("Contact", contactSchema);

module.exports = class ContactModel {
    constructor (body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    static findById (id) {
        return contactModel.findById(id);
    }

    static async getAll (userID) {
        return (await contactModel.find({ ownerID: userID })).sort(() => { createdAt: -1 });
    }

    static delete (id) {
        if (typeof id !== "string") return;
        return contactModel.findOneAndDelete({ _id: id });
    }

    async edit (id) {
        if (typeof id !== "string") return;
        this.checkInputs();
        this.validate();
        if (this.errors.length > 0) return;
        this.body.createdAt = Date.now();
        return this.contact = await contactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    async register () {
        this.checkInputs();
        this.validate();
        if (this.errors.length > 0) return;
        this.body.createdAt = Date.now();

        return this.contact = await contactModel.create(this.body);
    }

    validate () {
        if (!this.body.name) this.errors.push("A name is required");
        if (!this.body.telephone && !this.body.email) this.errors.push("Please, insert a phone or email");
        if (this.body.telephone && !validator.isMobilePhone(this.body.telephone)) this.errors.push("Invalid phone number");
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("Invalid email");
        return;
    }

    checkInputs () {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") this.body[key] = ""; 
        }
        return this.body = {
            ownerID: this.body._ownerID,
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            telephone: this.body.telephone
        };
    }
}