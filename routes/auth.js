const { route } = require('express/lib/application');
const router = require('express').Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../model/Validation");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{
    //validation
    const { error }  =  registerValidation(req.body);
    if (error)
        return res.status(440).send(error.details[0].message);   
    //checks if the user already exist
    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist) return res.status(400).send("Email already exists");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creates new user
    const   user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post("/login", async (req, res) => {
    //validating Login Info
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error);
    //checks if the user exists
    const userInfo = await User.findOne({email:req.body.email});
    if (!userInfo) return res.send("You're a cock");
    //check password
    const password = await bcrypt.compare(req.body.password, userInfo.password);
    if (!password) return res.send("god hates u");
    //else return res.send("login successful");

    //crete token
    const token = jwt.sign({_id: userInfo._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;