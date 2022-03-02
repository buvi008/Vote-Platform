const mongoose = require('mongoose');

const UserModal = require('./models/user.model')
// const User = mongoose.model("User", userScheme);
function newUser(){
    const user = new UserModal({
        id: 2,
        name: "Clin",
        password: "qwer12342",
        telephone: "+79282555555",
        city: "Хасавюрт",
        age: 34,
        verificationTel: true,
        employment: 'administration herk',
        email: 'admcsalerk@mail.ru'
    });

    user.save(function(err){
        mongoose.disconnect();  // отключение от базы данных

        if(err) return console.log(err);
        console.log("Сохранен объект", user);
    });
}

module.exports = newUser