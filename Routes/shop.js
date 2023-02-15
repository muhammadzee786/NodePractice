const express = require("express")
const path = require("path");


const router = express.Router()

const productController = require("../controllers/products.controller")

router.get('/', productController.getProducts);

module.exports = router