const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        // Verify the token (without 'Bearer' prefix)
        const decoded = jwt.verify(token, 'your_secret_key'); // Change 'your_secret_key' to your actual secret
        // Attach user details to the request object
        req.user = decoded.email;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
