const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

module.exports =  function  (req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.send("Acess denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}