require("dotenv").config()
const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')
const Task = require('./models/tasks.js');
const Goal = require('./models/goals.js');

/**
 * Connect to MongoDB
 **/
mongoose.connect("mongodb://0.0.0.0/Tasks", {
	useNewUrlParser: true,
	// useUnifiedTopology: true,
}); 

let db = mongoose.connection
db.on("error", (error)=> console.log(error));
db.once('open', () => console.log('database connected'))


app.use(cors())
app.use(express.json())

app.get('/tasks', (_req, res) => {
  Task.find({})
    .exec((err, tasks)=>{
      if(err){
        console.log(err)
      }else{
        res.send(tasks);
      }
    })
});

app.post('/tasks', (req, res) => {
    let task = new Task({
      description: req.body.data,
      urgency: 0
    })
   task.save((err, task)=>{
    if(err){
      console.log(err)
      res.sendStatus(400)
    }else
    console.log(`task saved successfully: ${task}`)
    res.sendStatus(200)
   })
});

app.delete('/tasks', (req, res) => {
  Task.findOneAndRemove({description: req.body.data})
    .exec((err, task) => {
      if(err){
        console.log(err)
      }else{
        console.log(task)
        res.send(task)
      }
    })
})

app.get('/goals', (req, res)=>{
  Goal.find({})
    .exec((err, goals)=>{
      if(err){
        console.log(err)
      }else{
        res.send(goals);
      }
    })
})

app.post('/goals', (req, res)=>{
  console.log({request: req.body.data})
  let goal = new Goal({
      description: req.body.data,
      done: false
    })
    goal.save((err, goal)=>{
    if(err){
      console.log(err)
      res.sendStatus(400)
    }else
    console.log(`goal saved successfully: ${goal}`)
    res.sendStatus(200)
   }) 
})

app.delete('/goals', (req, res) => {
  console.log('here')
  console.log(req.body.data)
  Goal.findOneAndRemove({description: req.body.data})
    .exec((err, task) => {
      if(err){
        console.log(err)
      }else{
        console.log(task)
        res.send(task)
      }
    })
})


app.listen(PORT, () => console.log(`listening on ${PORT} port`));

