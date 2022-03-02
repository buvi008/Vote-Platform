const compression = require('compression');
require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const UserModal = require('./models/user.model');


const dbConnect = require('./middlewares/dbConnect');

dbConnect();



const indexRouter = require('./routes/index');
const editProject = require('./routes/editProject');
const editUser = require('./routes/userRoutes/editUser');
const addLike = require('./routes/like');
const comment = require('./routes/comment');


const PORT = process.env.PORT || 5000;



app.use(compression());
app.use(cors())
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/', editProject);
app.use('/', addLike);
app.use('/', comment)
app.get('/adm/management', async (req, res, next) => {
  if (req.cookies.user) {
    const root = await UserModal.findOne({accessToken: JSON.parse(req.cookies.user).accessToken}, {_id: true}) ?? {};
    const roots = process.env.root.split(',');

    if (roots.includes(String(root._id))) {
      next();
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
})
app.use('/user', editUser);
app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



app.listen(PORT, () => {
  console.log('Server Start, PORT: '+PORT);
})
// const newUser = require( './seed')
// newUser();
