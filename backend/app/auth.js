const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const MongoDB = require("./utils/mongodb.util");
const NhanvienService = require('../app/services/nhanvien.services');
passport.use(new LocalStrategy(async function(username, password, done) {
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const user = await nhanvienService.authenticate(username, password);
        if (!user) {
            return done(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không chính xác trong authenticate' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const nhanvienService = new NhanvienService(MongoDB.client);
    nhanvienService.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
