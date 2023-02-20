const Product = require("../models/product.model");
const Cart = require("../models/cart.model")

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list',
            {
                prods: products,
                pageTitle: 'All Products',
                path: "/products"
            });
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId, product =>{
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path: "/products",
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index',
            {
                prods: products,
                pageTitle: 'Shop',
                path: "/",
            });
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Cart Checkout'
    })
}

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
        path: '/order',
        pageTitle: 'Your Orders'
    })
}