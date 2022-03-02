/* eslint-disable */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProjectModal = require('../models/project.model')
const VariantModal = require('../models/variant.model')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // '/files' это директория в которую будут сохранятся файлы
        cb(null, './public/static/images/variants')
    },
    filename: (req, file, cb) => {
        console.log(file)
        const { originalname } = file
        cb(null, changeName(originalname))
    }
})
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');



function changeName (originalname) {return String(Date.now()) + Math.floor(Math.random() * (99 - 10) + 10) + path.extname(originalname)}


const upload = multer({ storage: storage,
    limits: {
        fields: 5,
        // fieldNameSize: 50,
        // fieldSize: 20000,
        fileSize: 150000000000, // 150 KB for a 1080x1080 JPG 90
    },
    fileFilter: function(_req, file, cb){
        console.log(file)
        checkFileType(file, cb);
    }
})
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|mp4|mpeg2|avi/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Недопустимый формат!');
    }
}
const app = express();


router.route('/app/getDataProject')
    .post( async (req,res) => {
        const projects = await ProjectModal.find({city: req.body.city}, {updatedAt: false}).populate('variantId', {updatedAt: false, likes: false});
        console.log('Отправка', new Date());
        res.status(200).json({
            ok: true,
            projects
        })
    })

router.route('/app/postProject')
    .post( 
      body('name').isLength({ min: 1, max: 50 }),
      body('address').isLength({min: 1, max: 50}),
      body('city').isLength({min: 1, max: 50}),
      async (req,res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ok: false, errors: errors.array(), msg: 'Попробуйте перезагрузить страницу' });
        }

        const roots = process.env.root.split(',');
        const user = await userModel.findOne({accessToken: req.headers.authorization});

        if (roots.includes(String(user._id))) {
          const project = await new ProjectModal({
            id: (await ProjectModal.count()) + 1,
            name: req.body.name,
            variantId: [],
            adrProject: req.body.address,
            infoText: "",
            city: req.body.city,
            openProject: true,
          });

          try {
            project.save();
            return res.status(201).json({ok: true, project, msg: `[${project.id}] Проект ${project.name} создан`});
          } catch (error) {
            return res.status(500).json({ok: false, msg: 'Попробуйте перезагрузить страницу'});
          }
      

        } else {
          res.status(400).json({ok: false, msg: 'Попробуйте перезагрузить страницу'});
        }

    })
    .put(
        upload.any(),
        async (req, res) => {
          const data = req.body;

          const roots = process.env.root.split(',');
          const user = await userModel.findOne({accessToken: req.headers.authorization});


          if (data.id && data.name && data.infoText && roots.includes(String(user._id))) {
            const newVariant = await new VariantModal({
              nameVariant: data.name,
              images: [...req.files.map(el=> el.filename)],
              infoText: data.infoText,
              likes: [],
              count: 0,
            })

            try {
              newVariant.save();
              const project = await ProjectModal.updateOne({_id: data.id}, { $push: { variantId: newVariant._id }});
              if (project.ok) {
                  res.status(201).json({ok: true, msg: 'Вариант проекта создан', variant: newVariant});
              } else {
                  res.status(500).json({ok: false, msg: 'Повторите попытку позже'});
              }
            } catch (error) {
              return res.status(500).json({ok: false, msg: 'Попробуйте перезагрузить страницу'});
            }
            
          } else {
              return res.status(400).json({ok: false, msg: 'Попробуйте перезагрузить страницу'});
          }

    })


module.exports = router;
