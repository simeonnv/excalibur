import * as fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { setInterval } from 'timers/promises';

const PORT:number = 5000;
const app = express();
const DATABASENAME:string = "skibidi";
const ENCRYPTIONCODE = Math.random().toString(36);

mongoose.connect('mongodb://localhost:27017/' + DATABASENAME);
const db = mongoose.connection;

db.on('error', (error) => console.error(error, "connection disckroketed"));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use(cors());



// account format
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
// - /register (POST): Allows users to create an account. 
// - /login (POST): Allows users to log in to their account. 
// - /logout (GET): Allows users to log out of their account. 

app.get('/', (req, res) => {
    res.send("<h1>blehhhh</h1>")
})

app.post('/register', async (req, res) => {
    console.log("register", req.body)
    let token = "";
    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10) // encrypt password
        const user = new User({ email: req.body.email, username: req.body.username, password: hashedPassword, role: "student" });
        const newUser = await user.save();
        token = jwt.sign({ id: user._id, role: user.role }, ENCRYPTIONCODE, { expiresIn: '24h' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    res.json({ token });
})

app.post('/login', async (req, res) => {
    console.log("login", req.body)
    let token;
    
        const user = await User.findOne({ username: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log("nz", "BALLSLSS")
        if (user.role)
            token = jwt.sign({ id: user._id, role: user.role }, ENCRYPTIONCODE, { expiresIn: '24h' });
        else
            token = jwt.sign({ id: user._id, role: "student" }, ENCRYPTIONCODE, { expiresIn: '24h' });
        res.json({ 
            "token": token,
            "status": "success"
        });
    
    console.log("token", token)
    
    
})

// no tokens yet
app.post('/logout', function (req, res) {
    res.send("<h1>blehhhh</h1>")
})

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, ENCRYPTIONCODE, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(403);
      }
      next();
    };
};