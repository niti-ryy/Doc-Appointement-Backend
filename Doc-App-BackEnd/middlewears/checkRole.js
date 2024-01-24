const checkRole = (permittedRoles) => {
    return (req, res, next) => {
        if (permittedRoles.includes(req.user.role)) {
            next()
        } else {
            res.status(401).json({
                message: "You are not authorized to access this route"
            })
        }
    }
}

module.exports=checkRole
