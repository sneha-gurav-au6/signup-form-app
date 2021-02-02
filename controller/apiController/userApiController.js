const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/user");
const validateRegisterData = require("../../config/validation/registerValidator");

module.exports = {
    registerUser: async (req, res) => {
        //checking if user already existed or not
        const { errors, isValid } = validateRegisterData(req.body);
        const newerrors = [];
        newerrors.push(errors);

        //checking for validation
        if (!isValid) {
            return res.status(400).json({ data: errors });
        }
        var user = null;
        var user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user !== null) {
            console.log("error");
            res.status(400).json({ message: "Email already exists" });
        }
        if (user === null) {
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,

                email: req.body.email,
                password: req.body.password,
                country: req.body.country,
                organization: req.body.organization,
                phone_no: req.body.phone_no,
                no_of_staff: req.body.no_of_staff,
            });

            // console.log(newUser);
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser
                        .save()
                        .then((user) => {
                            res.json({
                                message:
                                    "Registered successfully. You can log in now",
                                user: user,
                                status: 200,
                            });
                        })
                        .catch((err) => console.log(err));
                });
            });
        }
    },
    loginUser: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        //checking for email and password match
        User.userFind(email, password)
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "Invalid Creadintials" });
                }
                const payload = {
                    id: user.id,

                    name: user.name,
                    email: user.email,
                };
                jwt.sign(
                    payload,
                    "secret key",
                    { expiresIn: 60 * 60 * 30 },
                    (err, token) => {
                        res.json({
                            message: "Logged in Successfully",
                            token: token,
                        });
                    }
                );
            })

            //if email or password not matches throw error
            .catch((err) => {
                res.status(401).json({
                    message: "Incorrect Credentials in login",
                });
            });
    },
};
