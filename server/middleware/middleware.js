import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const Middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Missing or invalid token' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'secretkeyofnoteapp123@');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
        }
        const newUser = await User.findById(user._id);

        req.user =newUser;
        next();
    } catch (error) {
        console.error('Middleware Error:', error);
        res.status(500).json({ success: false, message: 'Please log in' });
    }
};

export default Middleware;
