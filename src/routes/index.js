import express from "express"
import { registerUser, loginUser } from '../controller/UserController'

import { getTaskList } from '../controller/TaskController'
import authenticateToken from "../middleware"

const router = express.Router()

router.post('/create-user', registerUser)
router.post('/login-user', loginUser)
router.get('/task', authenticateToken, getTaskList)

module.exports = router