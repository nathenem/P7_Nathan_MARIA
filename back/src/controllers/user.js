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
  .digits(1) // Must have at least 2 digits
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
  if (!schema.validate(req.body.password)) {
    console.log(schema.validate(req.body.password));
    res.status(500).json({
      erreur: "Le mot de passe est trop faible.",
    });
  } else if (req.body.email && req.body.userName && req.body.password) {
    bcrypt.hash(req.body.password, 10, (_err, hash) => {
      const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: hash,
      });
      user.save().catch((err) => {
        console.log(err);
      });
    });
    res.status(201).json({ message: "Utilisateur enregistré" });
  } else {
    res.status(500).json({
      erreur:
        "Veuillez correctement définir l'email le pseudo et le mot de passe.",
    });
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
              token: jwt.sign(
                { isAdmin: user.isAdmin, userId: user._id },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              ),
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

// GET getOne
exports.getOne = (req, res) => {
  User.findById(req.auth.userId).then((item) => {
    if (item === null) {
      return res.status(404).json({ erreur: "élément introuvable" }); //message d'erreur si élément introuvable
    } else {
      res.json(item);
    }
  });
};

// DELETE deleteAccount
exports.deleteAccount = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (req.auth.userId !== req.params.id && !req.auth.isAdmin) {
      return res.status(401).json({
        message: "Vous ne pouvez pas supprimer le compte de quelqu'un d'autre.",
      });
    }
    User.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ message: "Le compte a bien été supprimé." })
    );
  });
};
