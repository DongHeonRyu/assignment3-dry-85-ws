var express = require('express');
//router
var inventoryDry85 = express.Router();

//controller
var getInventoryDry85 = require('../../Controllers/InventoryDry85Controller/InventoryDry85Controller');

inventoryDry85.get('/',getInventoryDry85.getInventory)

module.exports = inventoryDry85;