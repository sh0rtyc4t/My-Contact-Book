const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const loginSchema = new Schema({
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const loginModel = model("Login", loginSchema);

module.exports = class LoginModel {
    constructor (body) {
        this.body = body;
        this.errors = [];
        this.user = null;
        this.hasErrors = false;
    }

    async enter () {
        this.checkInputs();
        this.validate();
        if (this.errors.length > 0) return this.hasErrors = true;
        if (!await this.checkUser()) {
            this.errors = ["User not found, please create an account"];
            return this.hasErrors = true;
        }
        if (!bcrypt.compareSync(this.body.password, this.user?.password || "")) {
            this.errors = ["Incorrect password"];
            this.user = null;
            return this.hasErrors = true;
        }
        return;
    }

    async register () {
        this.checkInputs();
        this.validate();
        if (!this.body.fullName) this.errors.push("Your full name is required");
        if (await this.checkUser()) this.errors = ["This user already exists"];
        if (this.errors.length > 0) return this.hasErrors = true;
        const salt = bcrypt.genSaltSync();
        this.body.name = this.body.fullName.split(" ")[0];
        this.body.password = bcrypt.hashSync(this.body.password, salt);
        return this.user = await loginModel.create(this.body);
    }

    async checkUser () {
        this.user = await loginModel.findOne({ email: this.body.email });
        return Boolean(this.user);
    }

    validate () {
        if (!isEmail(this.body.email)) this.errors.push("Please insert a valid email");
        if (this.body.fullName && this.body.fullName.split(" ").length < 2) this.errors.push("Please, insert your FULL name");
        if (this.body.password.length < 4 || this.body.password.length > 50) this.errors.push("Your password must contain between 4 and 50 characters");
        return;
    }

    checkInputs () {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") this.body[key] = ""; 
        }
        return this.body = {
            fullName: this.body.fullName,
            email: this.body.email,
            password: this.body.password
        };
    }
}