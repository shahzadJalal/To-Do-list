const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});

app.post('/addtask', (req, res) => {
  let newTask = req.body.newtask;
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/removetask', (req, res) => {
  let completedTask = req.body.check;
  if (typeof completedTask === 'string') {
    tasks = tasks.filter(task => task !== completedTask);
  } else if (Array.isArray(completedTask)) {
    completedTask.forEach(task => {
      tasks = tasks.filter(t => t !== task);
    });
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
