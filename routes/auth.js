import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

const router = express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.send('Registration successful!');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h', 
    });

    req.session.user = user;

    res.send({token});
    // res.send("Login successfull");
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }

});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully.');
});


export default router;
