const database = require('../database/index');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Add the user document to the "users" collection in Firestore
        const user = database.collection('users').doc();
        const findUser = await database.collection('users').where('email', '==', email).get()

        if (!findUser.empty) {
            return res.status(400).json({ message: "Email is already exist" })
        }

        await user.set({ name, email, password });

        res.json({ message: 'User added successfully!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { registerUser }