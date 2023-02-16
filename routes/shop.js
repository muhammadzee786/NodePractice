const express = require("express")


const router = express.Router()

const productController = require("../controllers/shop.controller")

router.get('/', productController.getIndex);

router.get('/products',productController.getProducts );

router.get('/cart', productController.getCart);

router.get('/checkout', productController.getCheckout);

module.exports = router