var express = require('express');

//cartDry85 router
var cartDry85R = express.Router();

//Cart controller
var cartDry85Controller = require('../../Controllers/cartDry85Controller/cartDry85Controller')

//Cart 
cartDry85R.get('/',cartDry85Controller.getCartDry85)
cartDry85R.post('/',cartDry85Controller.addItemDry85)
cartDry85R.delete('/',cartDry85Controller.removeItemDry85)

//Cart Checkout
cartDry85R.post('/checkout', cartDry85Controller.checkOutDry85)

module.exports = cartDry85R;