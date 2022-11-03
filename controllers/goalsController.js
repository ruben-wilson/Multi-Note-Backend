const Goal = require('../models/goals');

const GoalsController = {

  Index: (req, res)=>{
  Goal.find({})
    .exec((err, goals)=>{
      if(err){
        console.log(err)
      }else{
        res.send(goals);
      }
    })
  },

  Add: (req, res)=>{
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
 }, 

 Delete: (req, res) => {
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
  }

}

module.exports = GoalsController