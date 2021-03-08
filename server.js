const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const { dbInitDatabase1 } = require("./integration/dbHandler");
const { dbInitDatabase2, migrateUser } = require("./integration/dbHandler");
const PORT1 = process.env.PORT || 3004;
const PORT2 = process.env.PORT || 3002;
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Cookie
app.use(
  session({
    key: "user",
    secret: "somerandomstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
app.use((req, res, next) => {
  if (req.cookies && req.cookies.user && !req.session.user) {
    res.clearCookie("user");
  }
  next();
});
// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user) {
//     res.redirect("/dashboard");
//   } else {
//     next();
//   }
// };

// simple route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post("/api/123", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
// Registers a function that logs all HTTP requests.
/*app.use((req, res, next) => {
    console.log(
        req.method + ' ' + req.originalUrl +
        " from " + req.ip
    );
    next();
});*/

// Router makes it easier to group related request handlers.
// The apiRoutes object creates an API for message (todo) handling:
const apiRoutes = require("./routes/apiRoutes");
// adds the API to the application:
app.use("/api", apiRoutes);

dbInitDatabase1().then(() => {
  app.listen(PORT1, () => {
    console.log("listening on: http://localhost:" + PORT1);
  });
});

dbInitDatabase2().then(async () => {
  app.listen(PORT2, () => {
    console.log("listening on: http://localhost:" + PORT2);
  });

  // When synchronizing old database, migrate its data to new database:
  const persons = await migrateUser();
  /*console.log(
    "All persons with their associated availabilities:",
    JSON.stringify(persons, null, 4)
  );*/
});
