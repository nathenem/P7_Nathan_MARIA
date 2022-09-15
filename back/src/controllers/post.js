// Import model
const Post = require("../model/post.model.js");
const { find } = require("../model/user.model.js");
const User = require("../model/user.model.js");

// GET getAll
exports.getAll = (req, res) => {
  Post.find().then((result) => {
    res.json(result);
  });
};

// GET getOne
exports.getOne = (req, res) => {
  Post.findById(req.params.id).then((item) => {
    if (item === null) {
      return res.status(404).json({ erreur: "élément introuvable" }); //message d'erreur si élément introuvable
    } else {
      res.json(item);
    }
  });
};

// POST create
exports.create = (req, res) => {
  User.findById(req.auth.userId)
    .then((user) => {
      const userName = user.userName;
      if (req.body && req.file) {
        console.log("fichier");
        const post = new Post({
          ...req.body,
          author: userName,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        });

        post.save().catch((err) => {
          console.log(err);
        });

        res.status(201).json({ message: "Post et image publiés" });
      } else {
        if (req.body) {
          console.log("pas fichier");
          const post = new Post({
            ...req.body,
            author: userName,
          });

          post.save().catch((err) => {
            console.log(err);
          });

          res.status(201).json({ message: "Post publié" });
        } else {
          res
            .status(400)
            .json({ erreur: "Veuillez correctement définir post et file." });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT modify
exports.modify = (req, res) => {
  console.log(req.body);
  Post.findById(req.params.id)
    .then((post) => {
      if (req.auth.userId !== post.userId) {
        return res.status(401).json();
      }
      if (req.file) {
        const postBody = JSON.parse(req.body.post);

        Post.findByIdAndUpdate(req.params.id, {
          ...postBody,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        })
          .then(() => {
            res.status(200).json({ message: "Post actualisé" });
          })
          .catch(() => {
            res.status(500);
          });
      } else {
        const postAlone = req.body.post;
        Post.findByIdAndUpdate(req.params.id, {
          ...postAlone,
        })
          .then(() => {
            res.status(200).json({ message: "Post actualisé" });
          })
          .catch(() => {
            res.status(500);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};

// DELETE delete
exports.delete = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (req.auth.userId !== post.userId) {
      return res.status(401).json();
    }
    Post.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ message: "Le post a bien été supprimé." })
    );
  });
};

// PUT likeOrDislike
exports.likeOrDislike = (req, res) => {
  const userId = req.body.userId;
  Post.findById(req.params.id).then((post) => {
    if (req.body.like > 0) {
      Post.updateOne(
        { _id: req.params.id },
        {
          $push: { usersLiked: userId },
          $pull: { usersDisliked: userId },
          $inc: { likes: 1 },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Like" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    if (req.body.like < 0) {
      Post.updateOne(
        { _id: req.params.id },
        {
          $pull: { usersLiked: userId },
          $push: { usersDisliked: userId },
          $inc: { dislikes: 1 },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Dislike" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    if (req.body.like === 0) {
      if (post.usersLiked.includes(userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersLiked: userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => {
            res.status(200).json({ message: "Like retiré" });
          })
          .catch(() => {
            res.status(500);
          });
      }
      if (post.usersDisliked.includes(userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersDisliked: userId },
            $inc: { dislikes: -1 },
          }
        )
          .then(() => {
            res.status(200).json({ message: "Dislike retiré" });
          })
          .catch(() => {
            res.status(500);
          });
      }
    }
  });
};
