const express = require("express")
const path = require("path");


const router = express.Router()

const adminData = require("../Routes/admin")

router.get('/', (req, res, next) => {
    // res.send(adminData.products)
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
    const products = adminData.products
    res.render('shop', {prods: products, docTitle: 'Shop'});
});

module.exports = router