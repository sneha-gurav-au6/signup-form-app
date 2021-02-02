const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//user model
const user = new Schema({
    //user from input register form

    email: {
        type: String,
    },
    password: {
        type: String,
    },

    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    country: {
        type: String,
    },
    organization: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    no_of_staff: {
        type: Number,
    },
});

//user login static method
user.statics.userFind = function (email, password) {
    var userObj = null;
    return new Promise(function (resolve, reject) {
        User.findOne({
            email: email,
        })
            .then(function (user) {
                console.log(user);
                if (!user) {
                    return reject("Incorrect Credintials");
                }
                userObj = user;
                return bcrypt.compare(password, user.password);
            })
            .then(function (isMatched) {
                if (!isMatched) return reject("Incorrect credentials as");
                console.log(isMatched);
                resolve(userObj);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};
module.exports = User = mongoose.model("users", user);
