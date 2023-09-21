import express from 'express'
import Todo from '../models/Todo.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.use(isAuthenticated)

// Add a new todo
router.post('/add', async (req, res) => { 
    if(req.session.user) {
        const { title, description } = req.body;
        const userId = req.session.user._id;
      
        const newTodo = new Todo({
          title,
          description,
          user: userId,
        });
      
        await newTodo.save();
      
        res.send('Todo added successfully!');
 
    } else {
        console.error("Not Logged In");
        res.status(500).json({ message: 'Please Login To add todos' });
    }
});


router.get('/list', async (req, res) => {
    
    if(req.session.user) {
        const userId = req.session.user._id;
        const todos = await Todo.find({ user: userId });
        res.json(todos);
    } else {
        console.error("Not Logged In");
        res.status(500).json({ message: 'Please Login to get todolist' });
    }
});

// Update a todo
router.put('/update/:id', async (req, res) => {
    if (req.session.user) {
      const { title, description } = req.body;
      const todoId = req.params.id;
  
        try {
        // Check if the todo with the given ID exists and belongs to the logged-in user
            const userId = req.session.user._id;
            const todo = await Todo.findOne({ _id: todoId });

            console.log(todo);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found or unauthorized' });
            }

            await Todo.findByIdAndUpdate(todoId, { title, description });

            res.send('Todo updated successfully!');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    } else {
      res.status(401).json("Please Login to Update todo");
    }
  });

// Delete a todo
router.delete('/delete/:id', async (req, res) => {
    const todoId = req.params.id;

    try {
      const todo = await Todo.findById(todoId);
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found.' });
      }
  
      if (todo.user.toString() !== req.session.user._id) {
        return res.status(403).json({ message: 'Unauthorized to delete this todo.' });
      }
  
      // Delete the todo
      await Todo.findByIdAndRemove(todoId);
  
      res.send('Todo deleted successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

  

export default router;
