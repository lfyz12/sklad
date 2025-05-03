const jwt = require('jsonwebtoken')
const ApiError = require('../Error/ApiError')


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.unauthorized())
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        if (!decoded) {
            return next(ApiError.unauthorized())
        }
        req.user = decoded
        next()
    } catch (e) {
        return next(ApiError.unauthorized())
    }
}