import express from "express"
import { registerUser, loginUser } from '../controller/UserController'

import { getTaskListByUser, addTask, updateTask, deleteTask } from '../controller/TaskController'
import authenticateToken from "../middleware"

const router = express.Router()

router.post('/create-user', registerUser);
router.post('/login-user', loginUser);

//Note: protected routes
router.post('/add-task', authenticateToken, addTask);
router.get('/tasks', authenticateToken, getTaskListByUser);
router.patch('/update-task', authenticateToken, updateTask);
router.delete('/delete-task', authenticateToken, deleteTask);

module.exports = router