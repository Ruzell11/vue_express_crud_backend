import express from "express"
import { registerUser, loginUser } from '../controller/UserController'

import { getTaskListByUser, addTask } from '../controller/TaskController'
import authenticateToken from "../middleware"

const router = express.Router()

router.post('/create-user', registerUser)
router.post('/login-user', loginUser)
router.post('/add-task', authenticateToken, addTask)
router.get('/tasks', authenticateToken, getTaskListByUser)

module.exports = router