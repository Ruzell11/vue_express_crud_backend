import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_INTERNAL_ERROR, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK, TASK_COLLECTION, } from "../constants";
import Validator from "validatorjs";
import generalHelper from '../helpers/generalHelper';
import database from "../database";

const getTaskListByUser = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            user_id: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }
        const { user_id } = req.body
        const findTask = await database.collection(TASK_COLLECTION).where('user_id', "==", user_id).get()

        if (findTask.empty) {
            return res.status(HTTP_STATUS_CODE_NOT_FOUND).json({ message: "No task available for this user" })
        }

        const userTaskArray = []

        findTask.forEach((task) => {
            const taskId = task.id
            userTaskArray.push({
                task_id: taskId,
                ...task.data()
            })
        });

        res.status(HTTP_STATUS_CODE_OK).json({ message: "User task list", tasks: userTaskArray })
    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: 'Internal Server Error' });
    }
}

const addTask = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            taskTitle: "required|string",
            taskDescription: "required|string",
            user_id: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }

        const { taskTitle, user_id, taskDescription } = req.body
        const taskCollection = database.collection(TASK_COLLECTION).doc();


        await taskCollection.set({
            name: taskTitle,
            description: taskDescription,
            user_id: user_id
        })

        res.status(HTTP_STATUS_CODE_OK).json({ message: "Task created successfully" })
    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: 'Internal Server Error' });
    }

}

const updateTask = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            taskTitle: "required|string",
            taskDescription: "required|string",
            task_id: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }
        const { task_id, taskTitle, taskDescription } = req.body

        const taskCollection = database.collection(TASK_COLLECTION).doc(task_id);
        const taskDoc = await taskCollection.get()

        if (!taskDoc.exists) {
            return res.status(HTTP_STATUS_CODE_NOT_FOUND).json({ message: "Task is not exist" })
        }
        const updatedTaskData = {
            name: taskTitle,
            description: taskDescription,
        };

        await taskCollection.update(updatedTaskData)

        res.status(HTTP_STATUS_CODE_OK).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: 'Internal Server Error' });
    }
}


const deleteTask = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            task_id: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }
        const { task_id } = req.body
        const taskCollection = database.collection(TASK_COLLECTION).doc(task_id);
        const taskDoc = await taskCollection.get();

        if (!taskDoc.exists) {
            return res.status(HTTP_STATUS_CODE_NOT_FOUND).json({ message: "Task is not exist" })
        }

        taskCollection.delete()

        res.status(HTTP_STATUS_CODE_OK).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getTaskListByUser, addTask, updateTask, deleteTask }