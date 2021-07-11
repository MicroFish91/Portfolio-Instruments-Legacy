let express = require("express");
let router = express.Router();
let db = require("../models");
const jwt = require("jwt-simple");
const env = require("../config/env");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportService = require("../config/passAuth");

let bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

// router.get("/protected", requireAuth, (req, res) => {
//   res.send("hello");
// });

// Sign-in
router.post("/signin", requireSignIn, (req, res) => {
  console.log("test");
  res.json({ token: tokenForUser(req.body.userName) });
});

// Register Account
router.post("/signup", (req, res) => {
  console.log("registering");

  let userName = req.body.userName;
  let userPassword = bcrypt.hashSync(req.body.userPassword, 8);

  // Check to see if
  db.users
    .findAll({
      where: {
        userName: req.body.userName,
      },
    })
    .then((results) => {
      console.log("register results:", results);

      // This userName (email address) does not exist
      if (results.length === 0) {
        db.users
          .create({
            userName: userName,
            userPassword: userPassword,
            benchmark: "",
          })
          .then((user) => {
            return res.json({ token: tokenForUser(user) });
          });
      } else {
        return res.status(422).send({ error: "Email already exists." });
      }
    });
});

// Create web token: https://jwt.io/
function tokenForUser(user) {
  let timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, env.JWT_SECRET);
}

module.exports = router;
