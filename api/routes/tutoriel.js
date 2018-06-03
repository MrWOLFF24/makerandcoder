const express = require('express')
const router = express.Router()

// import tutoriel model
const tutorielModel = require("./../models/tutoriel");

router.get('/getTutoriel/:id', (req, res) => {
    tutorielModel.getTutoriel((response) => {
      res.status(200).send(response);
    }, req.params);
});

router.get('/getLastTutoriels', (req, res) => {
  tutorielModel.getLastTutoriel((response) => {
    res.status(200).send(response);
  })
});

router.get('/userTutoriels/:id', (req, res) => {
  tutorielModel.getUserTutoriels((response) => {
    res.status(200).send(response);
  }, req.params);
})

router.get('/getTutoriels', (req, res) => {
    tutorielModel.getTutoriels((response) => {
      res.status(200).send(response);
    });
});

router.post('/postTutoriel', (req, res) => {
    tutorielModel.postTutoriels((response) => {
      res.status(200).send(response);
    }, req.body);
});

router.put('/updateTutoriel/:id', (req, res) => {
    tutorielModel.updateTutoriel((response) => {
      res.status(200).send(response);
    }, req.body, req.params.id);
});

module.exports = router
