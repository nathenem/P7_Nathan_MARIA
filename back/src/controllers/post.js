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
      if (req.body && req.file) {
        console.log("fichier");
        const post = new Post({
          ...req.body,
          author: user.userName,
          authorId: user._id,
          date: new Date(),
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
            author: user.userName,
            authorId: user._id,
            date: new Date(),
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
      if (req.auth.userId !== post.authorId && !req.auth.isAdmin) {
        return res.status(401).json();
      }
      if (req.file) {
        const postBody = req.body;

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
        const postAlone = req.body;
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
    if (req.auth.userId !== post.authorId && !req.auth.isAdmin) {
      return res.status(401).json({
        message: "Vous ne pouvez pas supprimer le post de quelqu'un d'autre.",
      });
    }
    Post.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ message: "Le post a bien été supprimé." })
    );
  });
};

// PUT likeOrDislike
exports.likeOrDislike = (req, res) => {
  console.log(req.body);

  const userId = req.body.userId;
  Post.findById(req.params.id).then((post) => {
    console.log("post trouvé");

    //like sans précédent
    if (
      req.body.like > 0 &&
      !post.usersLiked.includes(userId) &&
      !post.usersDisliked.includes(userId)
    ) {
      console.log("ajout like");
      Post.updateOne(
        { _id: req.params.id },
        {
          $push: { usersLiked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Like ajouté" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    //dislike sans précédent
    if (
      req.body.like < 0 &&
      !post.usersDisliked.includes(userId) &&
      !post.usersLiked.includes(userId)
    ) {
      console.log("ajout dislike");
      Post.updateOne(
        { _id: req.params.id },
        {
          $push: { usersDisliked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Dislike ajouté" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    //like précédent
    // nouveau like
    if (req.body.like > 0 && post.usersLiked.includes(userId)) {
      console.log("retrait like");
      Post.updateOne(
        { _id: req.params.id },
        {
          $pull: { usersLiked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Like retiré" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    //dislike avec like précédent
    if (req.body.like < 0 && post.usersLiked.includes(userId)) {
      console.log("ajout dislike + retrait like");
      Post.updateOne(
        { _id: req.params.id },
        {
          $pull: { usersLiked: userId },
          $push: { usersDisliked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Like retiré et Dislike ajouté" });
        })
        .catch(() => {
          res.status(500);
        });
    }

    // dislike précédent
    //nouveau dislike
    if (req.body.like < 0 && post.usersDisliked.includes(userId)) {
      console.log("retrait dislike");
      Post.updateOne(
        { _id: req.params.id },
        {
          $pull: { usersDisliked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Dislike retiré" });
        })
        .catch(() => {
          res.status(500);
        });
    }
    //like avec dislike précédent
    if (req.body.like > 0 && post.usersDisliked.includes(userId)) {
      console.log("retrait dislike + ajout like");
      Post.updateOne(
        { _id: req.params.id },
        {
          $push: { usersLiked: userId },
          $pull: { usersDisliked: userId },
        }
      )
        .then(() => {
          res.status(200).json({ message: "Disike retiré et like ajouté" });
        })
        .catch(() => {
          res.status(500);
        });
    }
  });
};
