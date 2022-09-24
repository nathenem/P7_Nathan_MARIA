// Import express
const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");
const auth = require("../../middleware/auth");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Call users controllers
const userController = require("../controllers/user");

// POST signup
router.post("/signup", userController.signup);

// POST login
router.post("/login", apiLimiter, userController.login);

// GET getOne
router.get("/profile", auth, userController.getOne);

// DELETE deleteAccount
router.delete("/:id", auth, userController.deleteAccount);

module.exports = router;
