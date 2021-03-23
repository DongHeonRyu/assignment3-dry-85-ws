const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
const port = 8000;

app.use(cors()); 
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
};

//Route
const cartDry85 = require('./routes/cartDry85/cartDry85');
const inventoryDry85 = require('./routes/inventoryDry85/inventoryDry85')

app.use('/cartDry85',cors(corsOptions),cartDry85);
app.use('/inventoryDry85',cors(corsOptions),inventoryDry85);

app.listen(port, () => {
  console.log(`Web Service Listening on port ${port}`);
});
