const express = require('express');
const router = express.Router();
const UserModal = require('../../models/user.model')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const createToken = require('../../helpers/token');
const loginDestroy = require('../../helpers/loginDestroy');


// const fetch = require('node-fetch');
// fetch('https://api.ucaller.ru/v1.0/initCall?service_id='+`469803`+'&key='+`HvauSB5JlDyY9pUPSHUzjEjMuVxxD4n8`+'&phone='+`79378577777`+'&code='+`6721`)
//     .then(res => res.json())
//     .then(json => console.log(json));



router.route('/create')

    .post(
        body('password').isLength({ min: 5, max: 50 }),
        body('city').isLength({min: 1, max: 30}),
        body('phone').isLength({ min: 11, max: 20 }),
        async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, password, phone, city, age, employ} = req.body;
        if (!(await UserModal.findOne({phone: phone}))) { /// подтверждение соглашения
            const user = new UserModal({
                id: await UserModal.count()+1 || 1,
                name: name || `Новый Пользователь`,
                password: await bcrypt.hash(password, +process.env.SALT_ROUNDS ?? 10),
                phone: phone,
                city: city,
                age: age,
                verificationTel: false,
                employment: employ || 'Не указано',
            });
            user.save(function(err){
                if(err) return console.log(err.message);
                console.log("Сохранен объект", user);
            });
            res.status(200).send(JSON.stringify({
                ok: true,
                msg: 'Регистрация аккаунта прошла успешно'
            }))
        } else {
            res.status(400).send(JSON.stringify({
                ok: false,
                msg: 'Пользователь с этим номером уже создан'
            }))
        }
    })

router.route('/signin')
    .post(
        body('password').isLength({ min: 5, max: 50 }),
        body('phone').isLength({ min: 11, max: 20 }),
        async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
          const {phone, password} = req.body;
          try {
              const user = await UserModal.findOne({ phone }).exec();
              const isValidPass = await bcrypt.compare(password, user.password);

              if (isValidPass) {
                  const payload = { id: user._id };
                  user.accessToken = createToken('access', payload);
                  user.refreshToken = createToken('refresh', payload);

                  user.save();

                  return res.json(loginDestroy(user));
              }
              return res.status(401).json({ ok: false, msg: 'Пользователь не зарегистрирован или введен неверный пароль' });
          } catch (error) {
              return res.status(500).json({ ok: false, msg: 'Пользователь не зарегистрирован или введен неверный пароль' });
          }
    })

router.route('/getuser')
    .post(
      body('id').isLength({min: 10}),
      body('token').isLength({min: 10}),
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.body;
        const token = req.headers.authorization;

        const user = await UserModal.findOne({_id: id});
        if(user._id) {
            if (user.accessToken === token) {
                res.status(200).send(JSON.stringify(loginDestroy(user)));
            } else {
                res.status(401).send(JSON.stringify({ok: false}));
            }
        } else {
            res.status(401).send(JSON.stringify({ok: false}));
        }
      }
    )


router.route('/logout')
    .post(
      async (req, res) => {
        const token = req.headers.authorization;

        
        const user = await UserModal.updateOne({accessToken: token}, {accessToken: '', refreshToken: ''});

        if(user.ok) {
          res.status(200).send(JSON.stringify({ok: true, msg: 'Успешный выход'}));
        } else {
          res.status(400).send(JSON.stringify({ok: false, msg: 'Попробуйте снова'}));
        }
      }
    )


router.route('/dontsudo')
      .post(
        async (req, res) => {
          const token = req.headers.authorization;
          const roots = process.env.root.split(',');
          const user = await UserModal.findOne({accessToken: token}, {_id: true});

          if (roots.includes(String(user._id))) {
            res.status(200).json({ok: true});
          } else {
            res.status(401).json({ok: false});
          }
        }
      )

















//
// router.route('/edit')
//     .post( async (req,res)=>{
//         console.log(req.body)
//         const projectLength = await ProjectModal.count()
//         let count = projectLength
//         console.log(projectLength)
//         if (projectLength === undefined){
//             count = 1
//         } else {
//             count = count + 1
//         }
//         const project = await new ProjectModal({
//             id: count,
//             name: req.body.name,
//             variantId: [],
//             adrProject: req.body.address,
//             infoText: "",
//             cityProject: "Khasavyrt",
//             openProject: true,
//         });
//
//         project.save(function(err){
//
//             if(err) return console.log(err);
//             console.log("Сохранен объект", project);
//         });
//         res.status(200).send(JSON.stringify({status: 'true'}))
//     })
module.exports = router;
