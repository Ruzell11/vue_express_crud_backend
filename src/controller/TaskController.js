import { HTTP_STATUS_CODE_OK } from "../constants"

const getTaskList = async (req, res) => {
    res.status(HTTP_STATUS_CODE_OK).json({ message: "protected" })
}

module.exports = { getTaskList }