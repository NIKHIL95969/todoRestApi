import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import authRoutes from './routes/auth.js';
import todoRouter from './routes/todo.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'; 


const app = express();
app.use(express.json());
dotenv.config();
  
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
  
app.use(express.urlencoded({ extended: true }));
const JWT_SECRET = process.env.JWT_SECRET;
  
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

  
app.use('/auth', authRoutes);
app.use('/todos', todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
