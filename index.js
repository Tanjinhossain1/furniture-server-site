const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4ybili6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db("products").collection("product");


        app.get('/furnitures',async(req,res)=>{
            const product = await productCollection.find().toArray();
            res.send(product)
        })

    }
    finally{

    }

}
run().catch(console.dir())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})