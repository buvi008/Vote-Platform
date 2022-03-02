const express = require('express');
const router = express.Router();
const VariantModal = require('../models/variant.model');
const UserModal = require('../models/user.model')
const Comment = require('../models/comment.model');
const { body, validationResult } = require('express-validator');


router.route('/comments')
  .get(async (req, res) => {
    const comments = await Comment.find({}).populate('author', {name: true, phone: true}).populate('to', {nameVariant: true});
    res.status(200).json({ok: true, comments})
  })
  .post(
    body('id').isLength({ min: 10, max: 50 }),
    body('message').isLength({ min: 1, max: 499 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ ok: false, msg: 'Попробуйте перезагрузить страницу и попробовать снова', errors: errors.array() });
      }

      const token = req.headers.authorization;
      const {id, message} = req.body;

      const user = await UserModal.findOne({accessToken: token}, {_id: true, accessToken: true}) ?? {};

      if (token === user.accessToken) {
        const comment = await new Comment({
          author: user._id,
          to: id,
          message: message
        });
        comment.save(function(err){
          if(err) return res.status(400).json({ok: false, msg: 'Попробуйте перезагрузить страницу и попробовать снова'});

          res.status(200).json({ok: true, msg: 'Ваш отзыв принят'});
        });
      } else {
        res.status(400).json({ok: false, msg: 'Перезагрузите страницу и попробуйте снова'});
      }

  })


module.exports = router;

