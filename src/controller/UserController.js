import { USER_COLLECTION, SALT_ROUNDS, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_OK, JWT_SECRET_KEY, HTTP_STATUS_CODE_INTERNAL_ERROR, HTTP_STATUS_CODE_NOT_FOUND } from '../constants';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import database from '../database/index';
import bcrypt from 'bcrypt';
import generalHelper from '../helpers/generalHelper'

const registerUser = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            email: "required|string",
            password: "required|string|min:5",
            name: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }
        const { name, email, password } = req.body;

        const user = database.collection(USER_COLLECTION).doc(); // Note: Add the user document to the "users" collection in Firestore
        const findUser = await database.collection(USER_COLLECTION).where('email', '==', email).get() //  Note : Find the email if exist

        if (!findUser.empty) {
            return res.status(HTTP_STATUS_CODE_BAD_REQUEST).json({ message: "Email is already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await user.set({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(HTTP_STATUS_CODE_OK).json({ message: 'User added successfully!' });

    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: 'Internal Server Error' });
    }
}


const loginUser = async (req, res) => {
    try {
        const validation = new Validator(req.body, {
            email: 'required|string',
            password: "required|string"
        });

        if (validation.fails()) {
            res.status(HTTP_STATUS_CODE_BAD_REQUEST)
                .json(generalHelper.getValidationError(validation));
            return;
        }

        const { email, password } = req.body
        const findUser = await database.collection(USER_COLLECTION).where('email', '==', email).limit(1).get()

        if (findUser.empty) {
            return res.status(HTTP_STATUS_CODE_NOT_FOUND).json({ message: "User is not exist" })
        }

        const userDoc = findUser.docs[0]
        const userData = userDoc.data()

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(HTTP_STATUS_CODE_BAD_REQUEST).json({ message: "Incorrect email or password" })
        }

        const token = jwt.sign({ id: userDoc.id, name: userData.username }, JWT_SECRET_KEY);

        res.json({ id: userDoc.id, name: userData.name, email: userData.email, token: token })

    } catch (error) {
        res.status(HTTP_STATUS_CODE_INTERNAL_ERROR).json({ error: error });
    }
}

module.exports = { registerUser, loginUser }