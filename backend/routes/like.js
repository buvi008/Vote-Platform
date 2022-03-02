const express = require('express');
const router = express.Router();
const VariantModal = require('../models/variant.model');
const UserModal = require('../models/user.model');
const ProjectModal = require('../models/project.model');

router.route('/addLike')
    .put(async (req, res) => {
        const token = req.headers.authorization;
        const {variant, project} = req.body;


        const findProject = await ProjectModal.findById({_id: project}).populate('variantId');
        const user = await UserModal.findOne({accessToken: token});

        const count = await VariantModal.findOne({_id: variant}, {count: true, nameVariant: true})

        if (!findProject.variantId.some(item => item.likes.includes(user.phone)) && user.accessToken === token) {
          if (findProject.city === user.city) {
            const update = await VariantModal.updateOne({_id: variant}, { $push: {likes: user.phone} , count: count.count+1});
            if (update.ok) {
                res.status(200).json({ok: true, msg: `Ваш голос за вариант «${count.nameVariant}» зачтен`})
            } else {
                res.status(400).json({ok: false, msg: 'Попробуйте перезагрузить страницу и попытаться снова'})
            }
          } else {
            res.status(400).json({ok: false, msg: 'Голосовать можно только за проекты города, указанного в вашем профиле'})
          }
        } else {
            res.status(400).json({ok: false, msg: `Вы уже проголосовали за один из вариантов проекта «${findProject.name}»`})
        }

    });


module.exports = router;

