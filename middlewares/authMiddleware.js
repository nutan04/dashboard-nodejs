

const authMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const _token = req.session.newtoken;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    if (_token !== authorization) {
        return res.status(401).json({ message: "Invalid token" });
    }

    // If the token is valid, proceed to the next middleware/route handler
    next();
};

module.exports = authMiddleware;
