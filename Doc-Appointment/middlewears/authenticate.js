const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    try {
        const extractedToken = token.split(" ")[1]; 
        const decoded = jwt.verify(extractedToken, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email
        };
        next()
    } catch (e) {
        return res.status(500).json({
            message: "Token verification failed",
            error: e.message
        });
    }
};

module.exports = authenticate;
