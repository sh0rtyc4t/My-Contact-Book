require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expSession = require("express-session");
const helmet = require("helmet");
const mongo = require("connect-mongo");
const flash = require("connect-flash");
const csurf = require("csurf");
const { globalMid, errEventMid, checkCsrf } = require("./src/middlewares.js");
const { MONGOURL, PORT } = process.env;
const app = express();

mongoose.connect(MONGOURL).then(() => {
    return app.listen(PORT, () => console.log(`Listening in http://127.0.0.1:${PORT}/`));
});

const session = expSession({
    store: mongo.create({ mongoUrl: MONGOURL }),
    secret: "eita bixo secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        httpOnly: true
    }
});

app.set('views', "./src/views");
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// Helmet pode causar problemas no localhost, recomendado usar apenas em https
// app.use(helmet());
app.use(flash());
app.use(session);
app.use(csurf());
app.use(globalMid);
app.use(checkCsrf);
app.use(require("./routes.js"));
app.use(errEventMid);