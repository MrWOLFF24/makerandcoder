const express = require('express')
const router = express.Router()

// import user model and services
const userModel = require("./../models/user")
const uploader = require("./../services/uploader")
const uploaderAvatar = uploader.single('avatar')


router.post("/login", (req, res) => {
  if (!req.body) {
      return res.status(500).send({message: "access non autorisé au serveur"});
  }

  userModel.login(response => {
      if (!response.error) {

        req.session.authUser = response.user;
        return res.status(201).send(response);

      } else {

      res.status(401).send(response);
      }

  }, req.body); // le second param de userModel.login() est ici !!!
});

router.post("/logout", (req, res) => {
  delete req.session.authUser
  res.status(200).send("vous êtes maintenant déconnecté");
});

router.post('/register', (req, res) => {
    try {
      userModel.register(response => {
      res.status(201).send(response);
      }, req.body);
    } catch(err) {
      res.status(500).send("soucis durant la création user");
    }
  });

  router.delete('/user/:id', (req, res) => {
  userModel.remove((reponse) => {
      res.send(reponse);
  }, req.params.id);
});

router.patch('/avatar', uploaderAvatar, (req, res) => {
  if (!req.file) { // pas de fichier reçu, retour au client
      return res.status(400).send({message: "No file received"});
  } else { // fichier ok
      uploaderAvatar(req, res, (err) => { // multer lance l'upload
      if (err) { // si une erreur survient pendant l'upload...
          return res.status(500).send({message: "Error during upload"});
      }
      // sinon si tout s'est bien passé ...
      userModel.patch.avatar((response) => {
          // mise à jour du model
          res.status(200).send({message: "File received", newAvatar: req.file.filename});

      }, req.file.filename, req.session.user.id);
      // req.file.filename représente le nom de fichier uploadé + modifié par multer (voir services/uploader.js)
      });
  }
});

router.patch('/about', (req, res) => {
  console.log(req.session.user.id);
  // return;
  userModel.patch.about((data) => {
      res.send({error: false, message: "yoyo"});
  }, req.body.about, req.session.user.id);
});

module.exports = router
