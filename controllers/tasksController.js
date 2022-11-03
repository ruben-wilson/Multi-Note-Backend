const Task = require('../models/tasks');


const TasksController = {

  Index: (req, res) => {
    Task.find({})
    .exec((err, tasks)=>{
      if(err){
        console.log(err)
      }else{
        res.send(tasks);
      }
    })
  },

  Add: (req, res) =>{
     console.log(req.body)
    let task = new Task({
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
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
  },

  Delete: (req, res) => {
  Task.findOneAndRemove({description: req.body.data})
    .exec((err, task) => {
      if(err){
        console.log(err)
      }else{
        console.log(task)
        res.send(task)
      }
    })
  }


}

module.exports = TasksController;