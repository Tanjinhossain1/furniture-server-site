const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4ybili6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db("products").collection("product");
        const cartCollection = client.db("products").collection("cart");
        const wishListCollection = client.db("products").collection("wishList");

        // get all product we have 
        app.get('/furnitures',async(req,res)=>{
            const product = await productCollection.find().toArray();
            res.send(product)
        })

        // add to cart all here
        // get the cart data 
        app.get('/allCartProduct',async(req,res)=>{
          const cartProduct = await cartCollection.find().toArray();
          res.send(cartProduct)
      })

        // add the cart data 
        app.put('/addToCart/:id', async (req, res) => {
          const id = req.params.id;
          const filter = {_id: ObjectId(id)}
          const addToCart = req.body;
          const options = { upsert: true };
          const updateDoc = {
            $set: addToCart,
        };
          const result = await cartCollection.updateOne(filter,updateDoc,options);
          res.send(result)
      })
      

      // cart price or quantity update 
        app.put('/updateCartProduct/:id', async (req, res) => {
          const id = req.params.id;
          const filter = {_id: ObjectId(id)}
          const updateProduct = req.body;
          const updateDoc = {
            $set:{
              price: updateProduct.newPrice,
              quantity: updateProduct.newQuantity
            }
        };
          const result = await cartCollection.updateOne(filter,updateDoc);
          res.send(result)
      })

      // delete the cart data 
      app.delete('/deleteCartProduct/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: ObjectId(id)};
        const deleteProduct = await cartCollection.deleteOne(filter);
        res.send(deleteProduct)
      })

      // get wish List 
      app.get('/wishList',async(req,res)=>{
        const wishListProduct = await wishListCollection.find().toArray();
        res.send(wishListProduct)
    })

      // add to addToWishList 
      app.put('/addToWishList/:id', async (req, res) => {
        const id = req.params.id;
        const filter = {_id: ObjectId(id)}
        const addToWishList = req.body;
        const options = { upsert: true };
        console.log(addToWishList)
        const updateDoc = {
          $set: addToWishList,
      };
        const result = await wishListCollection.updateOne(filter,updateDoc,options);
        res.send(result)
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