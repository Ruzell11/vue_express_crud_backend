import express from "express"
import { registerUser } from '../controller/UserController'

const router = express.Router()

router.post('/create-user', registerUser)

module.exports = router