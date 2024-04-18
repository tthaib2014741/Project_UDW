const express = require('express');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ApiError = require("./app/api-error");
const NxbRouter = require("./app/routes/nxb.route");
const SachRouter = require("./app/routes/sach.route");
const DocgiaRouter = require("./app/routes/docgia.route");
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

app.get('/admin/profile', (req, res) => {
    
    if (req.isAuthenticated()) {
       
        return res.status(200).json({
            user: req.user,
            status: 'success',
            message: 'Profile page'
        });
    } else {
        res.status(200).json({
            status: 'failed',
            message: 'Missing'
        })
    }
});

app.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/login'
  }),(req, res) => {
    try {
        res.json({
            body: req.body
        })
    } catch (error) {
        res.json({
            error: error.stack
        })
    }
});
// const user = {
//     username: "thanh",
//     password: "123"
// }
passport.use( new LocalStrategy( async (username, password, done) => {
    console.log(`username:::${username}, pass::::${password}`);
    const nhanvienService = new NhanvienService(MongoDB.client);
    const document = await nhanvienService.authenticate(username,password);
    console.log(document);
    if(document){
        return done(null, {
            username,
            password,
            active: true
        })
    }
    done(null, false)
}))

passport.serializeUser( (user, done) => done(null,user.username));

passport.deserializeUser( async(username, done) => {
    console.log(`deserializeUser:::${username}` );
    console.log(session);
    const nhanvienService = new NhanvienService(MongoDB.client);
    try {
        const user = await nhanvienService.findByUsername(username);
        const id=user._id;
        if (user) {
            return done(null, {
                username,
                id,
                active: true
            });
        }
        return done(null, false);
    } catch (error) {
        return done(error);
    }
})



// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});





app.use("/admin/nxb", NxbRouter);
app.use("/admin/sach", SachRouter);
app.use("/admin/docgia", DocgiaRouter);
app.use("/admin/nhanvien", NhanvienRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
