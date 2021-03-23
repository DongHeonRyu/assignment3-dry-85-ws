const fs = require("fs"); // fs is a library

exports.getCartDry85 = (req, res) => {
  //let cartData = require("../../data/Cart_DATA.json"); This one has a cache
  let cartData = JSON.parse(fs.readFileSync("./data/Cart_DATA.json"));

  res.header("Content-Type: application/json");
  res.send(cartData);
};

exports.removeItemDry85 = (req, res) => {
  let cartData = JSON.parse(fs.readFileSync("./data/Cart_DATA.json"));
  res.header("Content-Type: application/json");

  const SKU_ID = req.body.SKU;

  cartData.map((item) => {
    if (item.SKU === SKU_ID) {
      if (item.Quantity === 1) {
        cartData = cartData.filter((data) => data.SKU != SKU_ID);
      } else {
        return (item.Quantity -= 1);
      }
    }
  });

  const cartItemJson = JSON.stringify(cartData);
  fs.writeFileSync("./data/Cart_DATA.json", cartItemJson);

  res.send(JSON.stringify(cartData));
};

exports.addItemDry85 = (req, res) => {
  let cartData = JSON.parse(fs.readFileSync("./data/Cart_DATA.json"));
  const groceryData = require("../../data/Grocery_DATA.json");

  res.header("Content-Type: application/json");

  const SKU_ID = req.body.SKU;

  if (
    cartData.some((data) => {
      return data.SKU == SKU_ID;
    })
  ) {
    cartData.map((item) => {
      if (item.SKU == SKU_ID) {
        return (item.Quantity += 1);
      }
    });
  } else {
    groceryData.forEach((data) => {
      if (data.SKU == SKU_ID) {
        let newItem = {
          SKU: SKU_ID,
          Name: data.Name,
          Price: data.Price,
          Quantity: 1,
        };
        cartData.push(newItem);
      }
    });
  }
  // save cartData back to the json file //

  const cartItemJson = JSON.stringify(cartData);
  fs.writeFileSync("./data/Cart_DATA.json", cartItemJson);

  res.send(cartData);
};

exports.checkOutDry85 = (req, res) => {
  res.header("Content-Type: application/json");
  let groceryData = require("../../data/Grocery_DATA.json");
  let cartData = JSON.parse(fs.readFileSync("./data/Cart_DATA.json"));

  groceryData = groceryData.map((item) => {
    for (let i = 0; i < cartData.length; i += 1) {
      if (item.SKU === cartData[i].SKU) {
        item.Quantity -= cartData[i].Quantity;
      }
    }
    return item;
  });

  cartData = [];
  const groceryItemJson = JSON.stringify(groceryData);
  fs.writeFileSync("./data/Grocery_DATA.json", groceryItemJson);
  const cartItemJson = JSON.stringify(cartData);
  fs.writeFileSync("./data/Cart_DATA.json", cartItemJson);

  res.send(groceryData);
};
