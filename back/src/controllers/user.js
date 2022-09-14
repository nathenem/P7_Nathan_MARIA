// Import bcrypt and jsonwebtoken
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordValidator = require("password-validator");
let schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);
//

// Import user model
const User = require("../model/user.model.js");

// POST signup
exports.signup = (req, res) => {
  if (req.body.email && schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10, (_err, hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().catch((err) => {
        console.log(err);
      });
    });
    res.status(201).json({ message: "Utilisateur enregistré" });
  } else {
    res
      .status(500)
      .json({ erreur: "Veuillez correctement définir email et password." });
  }
};

// POST login
exports.login = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email })
      .then((user) => {
        bcrypt.compare(req.body.password, user.password, (_err, result) => {
          if (result) {
            return res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
                expiresIn: "24h",
              }),
            });
          } else {
            res.status(401).send("Login incorrect.");
          }
        });
      })
      .catch(() => {
        res.status(400).send("Utilisateur introuvable.");
      });
  }
};
