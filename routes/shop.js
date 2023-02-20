const express = require("express")


const router = express.Router()

const productController = require("../controllers/shop.controller")

router.get('/', productController.getIndex);

router.get('/products',productController.getProducts );

router.get('/products/:productId', productController.getProduct)

router.get('/cart', productController.getCart);

router.get('/checkout', productController.getCheckout);

router.get('/order', productController.getOrder);

module.exports = router