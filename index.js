require("dotenv").config()
const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')

const Default = require('./models/defaults.js')

const tasksRouter = require('./routes/tasksRoute.js')
const goalsRouter = require('./routes/goalsRoute.js');
const tasks = require("./models/tasks.js");

/**
 * Connect to MongoDB
 **/
mongoose.connect("mongodb://localhost:27017/Tasks", {
	useNewUrlParser: true,
	// useUnifiedTopology: true,
}); 

let db = mongoose.connection
db.on("error", (error)=> console.log(error));
db.once('open', () => console.log('database connected'))

app.use(cors())
app.use(express.json())

app.use('/tasks', tasksRouter)
app.use('/goals', goalsRouter)

app.get('/defaults', (req, res) =>{
  Default.find({})
  .exec((err, defaults) => {
    if(err){
      console.log(err)
    }else{
      res.send(defaults);
    }
  })
})

app.post('/defaults',  (req, res)=>{
  for(const e of req.body.data){
      let defaults = new Default({
        time: e.time,
        type: e.type, 
        description: e.description
      })
      defaults.save((err, defaults) => {
        if(err){
          console.log(err)
          res.sendStatus(400)
        }else{
          console.log(`default saved successfully: ${defaults}`)
        }
      })
  }
   res.sendStatus(200)
})

app.delete('/defaults', (req, res) => {
  console.log('Deleting defaults')
  Default.deleteMany({})
  .exec((err, result) => {
    if(err){
      console.log(err)
      res.sendStatus(404)
    }else{
      console.log(`collection restarted successfully ${result}`)
       res.sendStatus(200)
    }
  })
  
})

app.listen(PORT, () => console.log(`listening on ${PORT} port`));

