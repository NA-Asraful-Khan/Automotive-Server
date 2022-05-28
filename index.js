const express = require('express')
const app = express()
const cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const port = process.env.PORT || 5000;


const jwtoken = "d6b100a63acbfaf814115a3ef612aa45d9b58cf3debdc29b63914dae7070388d1666b2c7a0c45bb4569937cd863c2d554c1da4d7de41917271f45ce41f9d4407"

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

// U: admin1
// p: 1ApegYpEmvoOePDT

const uri = `mongodb+srv://admin1:1ApegYpEmvoOePDT@tools.a2ksy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message:"UnAuthorized Access"})
    }
    const token = authHeader.split(' ')[1];



}
async function run() {
    try {
        await client.connect();
        const toolCollection = client.db("DB").collection("Tool");
        const reviewCollection = client.db("DB").collection("Review");
        const OrderCollection = client.db("DB").collection("Order");
        const userCollection = client.db("DB").collection("User");
        const UpCollection = client.db("DB").collection("Update");
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
        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
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
            const query = {}
            const cursor = OrderCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })
        app.get('/order', async (req, res) => {

            const email = req.query.email;
            const query = { email: email }
            const cursor = OrderCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })

        app.get('/order/admin', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const cursor = OrderCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })

        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const order = await OrderCollection.findOne(query);
            res.send(order);
        })

        // Post Order
        app.post('/order', async (req, res) => {
            const newOrder = req.body;
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
        // GET user
        app.get('/user', async (req, res) => {
            const cursor = userCollection.find();
            const user = await cursor.toArray();
            res.send(user);
        })
        // GET user
        app.get('/user/admin', async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })

        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        // Put user
        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const updateDoc = {
                $set: { role: 'Admin' }
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // Put user

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            const token = jwt.sign({ email: email }, jwtoken, { expiresIn: '1h' });
            res.send({ result, token });
        })

        //update collection
        app.get('/update', async (req, res) => {
            const query = {}
            const cursor = UpCollection.find(query);
            const order = await cursor.toArray();
            res.send(order);
        })

        app.get('/update/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await UpCollection.findOne(query);
            res.send(result);
        })
        app.put("/update/:email", async (req, res) => {
            const email = req.params.email;
            const updateUser = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email,
                    address: updateUser.address,
                    education: updateUser.education,
                    linkedin: updateUser.linkedin,
                    mobile: updateUser.mobile
                },
            };
            const result = await UpCollection.updateOne(filter, updateDoc, options);
            res.send(result);

        })


    } finally {
        // close later 
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Success")
})

app.listen(port, () => {
    console.log(`My Web site is running on port: ${port}`)
})