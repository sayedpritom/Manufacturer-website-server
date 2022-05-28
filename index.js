const express = require('express')
const app = express()
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s4w5v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const partsCollection = client.db("manufacturer-website").collection("parts");
        const ordersCollection = client.db("manufacturer-website").collection("orders");
        const reviewsCollection = client.db("manufacturer-website").collection("reviews");
        const userDetailsCollection = client.db("manufacturer-website").collection("userDetails");
        const userCollection = client.db("manufacturer-website").collection("users");


        const verifyJWT = (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).send({ message: 'Unauthorized Access' })
            }

            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(403).send({ message: 'Forbidden Access' })
                }
                req.decoded = decoded;
                next();
            })
        }

        // get all parts/item
        app.get('/parts', async (req, res) => {
            const result = partsCollection.find({});
            const parts = await result.toArray();
            res.send(parts)
        })


        app.get('/orders/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const result = await ordersCollection.find(filter).toArray();
            res.send(result)
        })

        // get a specific parts/item from partsCollection
        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await partsCollection.find(filter).toArray();
            res.send(result)
        })

        // delete a specific order from ordersCollection
        app.delete('/delete/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = ordersCollection.deleteOne(filter);
            res.send(result)
        })

        // upload order to server. If already exists then replace the item
        app.post('/order', verifyJWT, async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result)
        })

        // upload review to server
        app.post('/addReview', verifyJWT, async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.send(result)
        })

        // get reviews from server 
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find({}).toArray();
            res.send(result)
        })
        // upload user's details to server
        app.put('/userDetails/:email', verifyJWT, async (req, res) => {
            const data = req.body;
            const email = req.params.email;
            const filter = { email: email };

            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    education: data.education,
                    phone: data.phone,
                    location: data.location,
                    linkedIn: data.linkedIn,
                },
            };
            const result = await userDetailsCollection.updateOne(filter, updatedDoc, options);
            res.send(result)
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
        })

    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From Manufacturer Website!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})