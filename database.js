const {createPool} = require('mysql');

const pool = createPool({
    host:'localhost',
    user:'root',
    password: '',
    database: 'test',
    connectionLimit: 10
})

pool.query('')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://furniture:<password>@cluster0.4ybili6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
