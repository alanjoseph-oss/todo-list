import express from 'express'

const app = express();
const port = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo 
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: idCounter++,
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update an existing todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].text = req.body.text;
        todos[todoIndex].completed = req.body.completed;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete  todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
