const dotenv= require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const app = express();

const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.route');
connectDB();
const {register} = require('./controllers/userController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
    // app.use((req, res, next) => {
    //     console.log('Request Body:', req.body);
    //     console.log('Content-Type:', req.headers['content-type']);
    //     next();
    // });
app.use('/api/user', userRouter);
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/scores', require('./routes/scores'));

module.exports = app;