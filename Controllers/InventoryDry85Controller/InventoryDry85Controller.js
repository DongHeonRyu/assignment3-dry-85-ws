exports.getInventory= (req, res) => {
    const groceryData = require("../../data/Grocery_DATA.json");
  
    res.header("Content-Type: application/json");
    res.send(groceryData);
  
  };
  