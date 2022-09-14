// Import express
const express = require("express");
const router = express.Router();

// Import middlewares auth and multer
const auth = require("../../middleware/auth");
const multer = require("../../middleware/multer-config");

// Call post controller
const postController = require("../controllers/post");

// GET getAll
router.get("/", auth, postController.getAll);

// GET getOne
router.get("/:id", auth, postController.getOne);

// POST create
router.post("/", auth, multer, postController.create);

// PUT modify
router.put("/:id", auth, multer, postController.modify);

// DELETE delete
router.delete("/:id", auth, postController.delete);

// PUT likeOrDislike
router.put("/:id/like", auth, postController.likeOrDislike);

module.exports = router;
