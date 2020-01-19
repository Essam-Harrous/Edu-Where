const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("../db/index.js");
const verify = require('./middleware/verifyToken');
const cors = require('cors');


require("dotenv").config();

let PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// app.use("/categorie", top3);
// app.use("/announces", announces);
// app.use("/announce", announce);
// app.use("/auth", authRoute);
// app.use("/update", updates);

app.post('/signUp', require('./reqhandle').signUp)
app.post('/signIn', require('./reqhandle').signIn)
//for every req that dosen't have a route serve the index.html

