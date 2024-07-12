import * as fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors'

const PORT:number = 5000;
const app = express();
const DATABASENAME:string = "skibidi"

mongoose.connect('mongodb://localhost:27017/' + DATABASENAME);
const db = mongoose.connection;

db.on('error', (error) => console.error(error, "connection disckroketed"));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use(cors());

// account format
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
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
    
    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10) // encrypt password
        const user = new User({ email: req.body.email, username: req.body.username, password: hashedPassword });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    res.send("success")
})

app.post('/login', async (req, res) => {
    console.log("login", req.body)
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.send("success")
})

// no tokens yet
app.post('/logout', function (req, res) {
    res.send("<h1>blehhhh</h1>")
})

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);
