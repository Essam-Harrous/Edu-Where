const express = require("express");
const db = require("../../db/models/offers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.delete("/delete", verifyToken, (req, res) => {
  let { firstName, lastName, email } = req.user.user;
  db.findAndDelete(req.body.id, firstName, lastName).then(data =>
    res.status(204).json(data)
  );
});

router.post("/add", verifyToken, (req, res) => {
  let { region, price, phone, categorie, description } = req.body;
  if (!req.user.user) req.user.user = req.user;
  let { firstName, lastName, email } = req.user.user;
  let announce = {
    firstName,
    lastName,
    email,
    region,
    price,
    phone,
    description,
    categorie
  };
  db.addToDb(announce)
    .then(result => res.json(result))
    .catch(err => res.json("err"));
});

router.get("/getAll", verifyToken, (req, res) => {
  let { firstName, lastName, email } = req.user.user;
  db.findAllbyName(firstName, lastName).then(result =>
    res.status(201).json(result)
  );
  // db.findAllbyEmail(email).then(result => res.send(result));
});


router.get("/:id", (req, res) => {
  db.findAll(req.params.id.toLowerCase()).then(result => {
    res.status(200).send(result);
  });
});

module.exports = router;
