const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9x9xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const cycleCollection = client.db('Bicycle-hose').collection('cycle')

        app.get('/cycle', async (req, res) => {
            const query = {}
            const cursor = cycleCollection.find(query)
            const cycles = await cursor.toArray()
            res.send(cycles)
        })

        app.get('/cycle/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cycle = await cycleCollection.findOne(query)
            res.send(cycle)
        })

        //post
        app.post('/cycle', async (req, res) => {
            const newCycle = req.body;
            const result = await cycleCollection.insertOne(newCycle)
            res.send(result)
        })

        //delete
        app.delete('/cycle/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await cycleCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server in runing like cycle!!')
})

app.listen(port, () => {
    console.log('curd in runing')
})