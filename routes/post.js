const router = require('express').Router();
const verify = require("./validateToken");

router.get("/", verify, (req, res) => {
    res.json({
        posts: {
            title: "My first post",
            description: "Random data you shouldn't acess"
        }
    });
});

module.exports = router;