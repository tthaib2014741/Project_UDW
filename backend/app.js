const express = require('express');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ApiError = require("./app/api-error");
const NxbRouter = require("./app/routes/nxb.route");
const SachRouter = require("./app/routes/sach.route");
const DocgiaRouter = require("./app/routes/docgia.route");
const DocgiaService = require('./app/services/docgia.services');
const NhanvienRouter = require("./app/routes/nhanvien.route");
const NhanvienService = require('./app/services/nhanvien.services');
const MongoDB = require("./app/utils/mongodb.util");

const app = express();

// Cấu hình middleware
app.use(cors());
app.use(express.json());
const store = session.MemoryStore();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store
}));

// Sử dụng Passport và session middleware
app.use(passport.initialize());
app.use(passport.session());

// Chiến lược địa phương cho admin
passport.use('admin', new LocalStrategy(async (username, password, done) => {
    try {
        const nhanvienService = new NhanvienService(MongoDB.client);
        const user = await nhanvienService.authenticate(username, password);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error);
    }
}));

// Chiến lược địa phương cho user
passport.use('user', new LocalStrategy(async (username, password, done) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const user = await docgiaService.authenticate(username, password);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error);
    }
}));

// Serialize và deserialize user cho admin và user
passport.serializeUser((user, done) => {
    if (user.CHUCVU) { 
        console.log('admin');
        console.log(user);
        done(null, { id: user._id, role: 'admin' }); // Thực hiện serializeUser cho admin
    } else if (user.TEN) { // Nếu user có thuộc tính TEN
        console.log('user');
        console.log(user);
        done(null, { id: user._id, role: 'user' }); // Thực hiện serializeUser cho user
    }
});

passport.deserializeUser(async (data, done) => {
    if (data.role === 'admin') {
        const nhanvienService = new NhanvienService(MongoDB.client);
        try {
            const user = await nhanvienService.findById(data.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    } else if (data.role === 'user') { // Nếu user có role là user
        const docgiaService = new DocgiaService(MongoDB.client);
        try {
            const user = await docgiaService.findById(data.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    }
});

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

// Routes cho admin
app.get('/admin/profile', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            user: req.user,
            status: 'success',
            message: 'admin page'
        });
    } else {
        res.status(200).json({
            status: 'failed',
            message: 'Missing'
        });
    }
});

app.post('/admin/login', passport.authenticate('admin', {
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/login'
}));

app.use("/admin/nxb", NxbRouter);
app.use("/admin/sach", SachRouter);
app.use("/admin/nhanvien", NhanvienRouter);

// Routes cho user
app.get('/user/profile', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            user: req.user,
            status: 'success',
            message: 'user page'
        });
    } else {
        res.status(200).json({
            status: 'failed',
            message: 'Missing user'
        });
    }
});

app.post('/user/login', passport.authenticate('user', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login'
}));

app.use("/admin/docgia", DocgiaRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
    const error = new ApiError(404, "Resource not found");
    next(error);
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
