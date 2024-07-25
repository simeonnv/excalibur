    import fs from 'fs';
    import path from 'path';
    import express from 'express';
    import mongoose, { Document, Schema } from 'mongoose';
    import bcrypt from 'bcryptjs';
    import bodyParser from 'body-parser';
    import jwt from 'jsonwebtoken';
    import cors from 'cors';
    import { setInterval } from 'timers/promises';
    import { fileURLToPath } from 'url';
    import multer from 'multer'
    const upload = multer();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const PORT:number = 5000;
    const app = express();
    const DATABASENAME:string = "excalibur";
    console.log(Math.random().toString(36))
    const ENCRYPTIONCODE = Math.random().toString(36);
    let tokens = []

    mongoose.connect('mongodb://localhost:27017/' + DATABASENAME);
    const db = mongoose.connection;

    db.on('error', (error) => console.error(error, "connection disckroketed"));
    db.once('open', () => console.log('Connected to Database'));


    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));

    const defaultImagePath = path.join(__dirname, '..', 'src', 'assets', 'Default.webp');
    const defaultImage = {
      data: fs.readFileSync(defaultImagePath),
      contentType: 'image/webp'
    };

    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        firstname: {type: String, required: true},
        secondname: {type: String, required: true},
        role: {type: String, required: true},
        password: { type: String, required: true },
        image: {
            data: Buffer,
            contentType: String
        }
    });

    const classroomSchema = new Schema({
        name: { type: String, required: true },
        teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        image: {
            data: Buffer,
            contentType: String
        }
    });


    const Classroom = mongoose.model('Classroom', classroomSchema);

    const User = mongoose.model('User', userSchema);
    
try {
    const hash: string = await bcrypt.hash("password", 10)
    const user = new User({ 
        email: "simmeon.nv@gmail.com", 
        firstname: "simeon", 
        secondname: "vang", 
        password: hash, 
        role: "teacher",
        image: defaultImage
    });
    const newUser = await user.save();
} catch (err) {

}
    


    app.get('/', (req, res) => {
        res.send("<h1>blehhhh</h1>")
    })

    app.post('/register', async (req, res) => {
        console.log("register", req.body)
        let token = "";
        try {
            const hashedPassword: string = await bcrypt.hash(req.body.password, 10) // encrypt password
            const user = new User({ 
                email: req.body.email, 
                firstname: req.body.firstname, 
                secondname: req.body.secondname, 
                password: hashedPassword, 
                role: "student",
                image: defaultImage
            });
            const newUser = await user.save();
            token = jwt.sign({ id: user._id, role: user.role }, ENCRYPTIONCODE, { expiresIn: '24h' });
            tokens.push(token)
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
        res.json({ token });
    })

    app.post('/login', async (req, res) => {
        console.log("login", req.body)
        let token;
        
            const user = await User.findOne({ email: req.body.email });
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

    app.listen(PORT, () =>
        console.log(`Example app listening on port ${PORT}!`),
    );


    const authenticateToken = (req, res, next) => {
        console.log('Headers:', req.headers); 
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(401);
    
        jwt.verify(token, ENCRYPTIONCODE, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
        });
    };

    const authorizeRole = async (level) => {
        return (req, res, next) => {
            const token = req.body.token;
            if (!token) return res.status(401).send('Token is required');
    
            try {
                const decoded = jwt.verify(token, ENCRYPTIONCODE);
                const { id, role } = decoded;
                console.log("role", role)
                if (level === role) {
                    next();
                } else {
                    return res.status(403).send('Forbidden');
                }
            } catch (err) {
                console.log(err)
                return res.status(401).send('Token is invalid');
            }
        };
    };

    let checkTokenValidity = async (req, res, next) =>{
        console.log("checkTokenValidity ", req.body)
        const token = req.body.token;
        if (!token) return res.status(401).send('Token is required');

        try {
            const decoded = jwt.verify(token, ENCRYPTIONCODE);
            const tokenDoc = tokens.map((x) => x == decoded);

            if (!tokenDoc) {
                return res.status(401).send('Token is invalid');
                console.log("topki")
            }

            req.user = decoded;
            next()
        } catch (err) {
            console.log(err)
            return res.status(401).send('Token is invalid');
        }
    }

    app.post('/checktoken', await checkTokenValidity, (req, res) => {
        const role = req.user.role
        res.send({ isAuthenticated: true, message: 'Access granted to counter', role: role });
    })

    app.post('/checkteacher', await checkTokenValidity, await authorizeRole("teacher"), (req, res) => {
        const role = req.user.role
        res.send({ isAuthenticated: true, message: 'Access granted to counter', role: role });
    })

    // app.post('/classes', await checkTokenValidity, authorizeRole("student"),  (req, res) => {

    // })



    


    app.get("/users/:id", async (req, res) =>
    {
        const token = req.body.token
        let tokenId 
        jwt.verify(token, ENCRYPTIONCODE, (err, id) => {
            if (err) return res.sendStatus(403);
            tokenId = id;
        });
        const id = req.params.id
        
        
        const user = await User.findById(id);

        res.json({
            firstname: user.firstname,
            secondname: user.secondname,
            image: user.image
        })
    })


    app.post("/users/me", async (req, res) =>
    {
        const token = req.body.token

        let tokenInfo
        jwt.verify(token, ENCRYPTIONCODE, (err, info) => {
            if (err) return res.sendStatus(403);
            tokenInfo = info;
        });

        console.log(tokenInfo)
        const tokenId = tokenInfo.id

        const user = await User.findById(tokenId);
        res.json({
            firstname: user.firstname,
            secondname: user.secondname,
            image: {
                data: user.image.data.toString('base64'),
                contentType: user.image.contentType
            },
            email: user.email
        })
    })

    app.put('/users/me', upload.single('image'), async (req, res) => {
        try {
            const token = req.body.token

            let tokenInfo
            jwt.verify(token, ENCRYPTIONCODE, (err, info) => {
                if (err) return res.sendStatus(403);
                tokenInfo = info;
            });
    
            console.log(tokenInfo)
            const userId = tokenInfo.id

            const user = await User.findById(userId);
      
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
      
          const { email, password } = req.body;
          if (email) {
            user.email = email;
          }
          if (password){
            user.password = await bcrypt.hash(password, 10)
          }
      
          if (req.file) {
            user.image = {
              data: req.file.buffer,
              contentType: req.file.mimetype
            };
          }
      
          await user.save();
          res.status(200).send({ message: 'User updated successfully!' });
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
      });
      
      app.put('/class', await authorizeRole("teacher"), upload.single('image'), async (req, res) => {
        try {
            console.log("why", req.body)
            const token = req.body.token

            let tokenInfo
            jwt.verify(token, ENCRYPTIONCODE, (err, info) => {
                if (err) return res.sendStatus(403);
                tokenInfo = info;
            })
            const teacherId = tokenInfo.id

            const classroom = new Classroom({
                name: req.body.name,
                teacher: teacherId,
                students: []
            });

            classroom.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        
            await classroom.save();

          res.status(200).send({ message: 'classroom made successfully' });
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
      });

      app.post("/class", async (req, res) => {
        const token = req.body.token;
    
        let tokenInfo;
        jwt.verify(token, ENCRYPTIONCODE, (err, info) => {
            if (err) return res.sendStatus(403);
            tokenInfo = info;
        });
    
        const tokenId = tokenInfo.id;
        const tokenRole = tokenInfo.role;
        let classrooms;
    
        if (tokenRole === 'teacher') {
            classrooms = await Classroom.find({ teacher: tokenId });
        } else if (tokenRole === 'student') {
            classrooms = await Classroom.find({ students: tokenId });
        }

        let array = [];
        classrooms.forEach(e => {
            let json = {
                name: e.name,
                id: e._id,
                image: {
                    data: e.image.data.toString('base64'),
                    contentType: e.image.contentType
                }
            }
            array.push(json)
        });

        res.json({
            classes: array
        });
    });
    
    
    