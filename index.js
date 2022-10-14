require("dotenv").config()
const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')
const Task = require('./models/tasks.js');

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


app.listen(PORT, () => console.log(`listening on ${PORT} port`));

