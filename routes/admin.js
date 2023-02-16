const express = require("express")
const router = express.Router();


const productController = require('../controllers/admin.controller')
// /admin/add-product => GET
router.get('/add-product', productController.getAddProducts);

// /admin/products => GET
router.get('/products', productController.getProducts);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProducts);

module.exports = router
