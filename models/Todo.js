import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Todo', todoSchema);
