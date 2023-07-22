const { USER_COLLECTION, SALT_ROUNDS } = require('../constants');
const database = require('../database/index');
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = database.collection(USER_COLLECTION).doc(); // Note: Add the user document to the "users" collection in Firestore
        const findUser = await database.collection(USER_COLLECTION).where('email', '==', email).get() //  Note : Find the email if exist

        if (!findUser.empty) {
            return res.status(400).json({ message: "Email is already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await user.set({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.json({ message: 'User added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { registerUser }