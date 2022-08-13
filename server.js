// Dependencies
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
var mongoStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./config/passport").passport;
const flash = require("connect-flash");
const { strict } = require("@hapi/joi/lib/base");

port = process.env.PORT || 4050

// static file
app.use(express.static("public"));

// ======setting parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
    session({
      cookie: {
        maxAge: 180 * 60 * 1000,
      },
      secret: "dfskfgsdfbcdncdsfsgkflsfabdasduaegefdblakhslkjdfsjkdfbsdk",
      resave: false,
      saveUninitialized: false,
      // store: mongoStore.create({ client: require("./config/db") }),
      store: new mongoStore({
        url:  require("./config/db"),
        collection: 'mySessions'
      })
    })
  );
  
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success");
  res.locals.error_messages = req.flash("error");
  res.locals.user = req.user ? true : false;
  res.locals.session = req.session;
  next();
});

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database connections
mongoose.Promise = global.Promise;
const MONGO_URL = require("./config/db").MONGOURL;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(`Database Connection failed ${err.message}`));

// to routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/newregister"));

app.listen(port, () => {
  console.log("Port running at: ", port);
});
