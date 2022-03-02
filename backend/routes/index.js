const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
      console.log(req.connection.remoteAddress)
    res.status(200).send(JSON.stringify({title: 'CMC'}))
  });


module.exports = router;
