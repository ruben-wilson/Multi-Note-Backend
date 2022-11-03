require("dotenv").config()
const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')

const tasksRouter = require('./routes/tasksRoute.js')
const goalsRouter = require('./routes/goalsRoute.js')

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

app.use('/tasks', tasksRouter)
app.use('/goals', goalsRouter)

app.listen(PORT, () => console.log(`listening on ${PORT} port`));

