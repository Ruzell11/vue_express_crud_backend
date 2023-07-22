import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants';
// Middleware to verify the JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Note: Verify the token using the secret key
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }


        req.user = user;
        next();
    });
}

export default authenticateToken


