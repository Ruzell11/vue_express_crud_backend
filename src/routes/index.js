const router = require("express").Router();
const { registerUser } = require('../controller/UserController');


router.post('/create-user', registerUser)


module.exports = router