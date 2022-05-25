const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

// U: admin1
// p: 1ApegYpEmvoOePDT

const uri = "mongodb+srv://admin1:1ApegYpEmvoOePDT@tools.a2ksy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toolCollection = client.db("DB").collection("Tool");
        const reviewCollection = client.db("DB").collection("Review");
        // Get Review
        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })
        //Post Review
        app.post('/review', async (req, res) => {
            const newReview = req.body;
            const review = await reviewCollection.insertOne(newReview);
            res.send({ review });
        })
        // Get Tools
        app.get('/tool', async (req, res) => {
            const query = {};
            const cursor = toolCollection.find(query);
            const tool = await cursor.toArray();
            res.send(tool);
        })

        // Post Tools
        app.post('/tool', async (req, res) => {
            const newTool = req.body;
            console.log('adding new Tool', newTool);
            const tool = await toolCollection.insertOne(newTool);
            res.send({ tool });
        })
        // Post Tools
        app.delete('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tool = await toolCollection.deleteOne(query);
            res.send(tool);
        })


    } finally {
        // close later 
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`My Web site is running on port: ${port}`)
})