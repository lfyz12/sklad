const { User, Order} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
    return { accessToken};
}
class UserController {
    // Регистрация
    async registration(req, res, next) {
        try {
            const { Fullname, Email, Password, IsAdmin} = req.body;

            const existingUser = await User.findOne({ where: { Email } });
            if (existingUser) {
                return next(ApiError.badRequest('Пользователь с таким номером уже существует.'));
            }

            const hashedPassword = await bcrypt.hash(Password, 10);
            const user = await User.create({ Fullname, Email, Password: hashedPassword, IsAdmin });

            return res.json({ user: { id: user.Id, fullname: user.Fullname, email: user.Email, isAdmin: user.IsAdmin }});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Логин
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { Email: email } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не найден.'));
            }

            const isPasswordValid = await bcrypt.compare(password, user.Password);
            if (!isPasswordValid) {
                return next(ApiError.badRequest('Неверный пароль.'));
            }

            const tokens = generateTokens({ id: user.Id, fullname: user.Fullname, Email: user.Email, isAdmin: user.IsAdmin });

            return res.json({ user: { id: user.Id, fullname: user.Fullname, email: user.Email, isAdmin: user.IsAdmin }, tokens });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkAuth(req, res, next) {
        try {
            const { token} = req.body;
            const decode = jwt.decode(token, process.env.JWT_ACCESS_SECRET)
            console.log(decode)
            const user = await User.findOne({ where: { Email: decode.Email } });
            return res.json({ user: { id: user.Id, fullname: user.Fullname, email: user.Email, isAdmin: user.IsAdmin }});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json({users})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}


module.exports = new UserController();