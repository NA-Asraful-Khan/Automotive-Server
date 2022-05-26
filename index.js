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
        const OrderCollection = client.db("DB").collection("Order");
        const userCollection = client.db("DB").collection("User");
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
        // Get Tool
        app.get('/tool/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const tool = await toolCollection.findOne(query);
            res.send(tool);
        })

        // Post Tools
        app.post('/tool', async (req, res) => {
            const newTool = req.body;
            const tool = await toolCollection.insertOne(newTool);
            res.send({ tool });
        })
        // Get Order
        app.get('/order', async (req, res) => {
            const query = {};
            const cursor = OrderCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })
        // Get Order
        app.post('/order', async (req, res) => {
            const newOrder = req.body;
            console.log('adding new Tool', newOrder);
            const order = await OrderCollection.insertOne(newOrder);
            res.send({ order });
        })
        // delete Tools
        app.delete('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tool = await toolCollection.deleteOne(query);
            res.send(tool);
        })

        // delete Order
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await OrderCollection.deleteOne(query);
            res.send(order);
        })

        // Put user

        app.put('/user/:email', async (req, res) => {
           const email = req.params.email;
           const user = req.body;
           const filter = {email: email};
           const options = {upsert: true};
           const updateDoc ={
                $set: user
           };
           const result = await userCollection.updateOne(filter,updateDoc,options);
           res.send(result);
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