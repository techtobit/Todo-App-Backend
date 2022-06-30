const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://EndGame:EndGame@cluster0.8ea9w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
 try {
  await client.connect();
  const taskCollection = client.db("TodoApp").collection("Task");
  const taskFinishCollection = client.db("TodoApp").collection("TaskFinish");

  // ---------------- Todo App ---------------//

  //Display All Task
  app.get('/task', async (req, res) => {
   const query = {};
   const cursor = taskCollection.find(query)
   const tasks = await cursor.toArray()
   res.send(tasks);
  })

  //For Editing & Updating Task
  app.get('/task/:id', async (req, res) => {
   const id = req.params.id;
   const query = {_id : ObjectId(id)};
   const cursor = taskCollection.find(query)
   const tasks = await cursor.toArray()
   res.send(tasks);
  })


  //For Add new Task on list
  app.post('/task', async (req, res) => {
   const data = req.body;
   const newTask = await taskCollection.insertOne(data)
   res.send(newTask);
  })


  //Once Task Finish it will Save on new Database to show complied
  app.post('/taskFinish', async (req, res) => {
   const data = req.body;
   const newTaskFinish = await taskFinishCollection.insertOne(data)
   res.send(newTaskFinish);
  })


  //The Finish task will remove from List
  app.delete('/task/:id', async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const taskFinish = taskCollection.deleteOne(query)
   res.send(taskFinish);
  })


 } catch (error) {

 }
}



run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))