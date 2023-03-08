const Product = require("../models/product.model");
const Cart = require("../models/cart.model")

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list',
                {
                    prods: products,
                    pageTitle: 'All Products',
                    path: "/products"
                });
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findAll({
        where: {
            id : prodId
        }
    })
        .then(product => {
            res.render('shop/product-detail',{
                product: product[0],
                pageTitle: product[0].title,
                path: "/products",
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index',
                {
                    prods: products,
                    pageTitle: 'Shop',
                    path: "/",
                });
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
        .then(([product]) => {
            Cart.addProduct(prodId, product.price)
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(([product]) => {
            Cart.deleteProduct(prodId, product.price);
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll()
            .then(([products]) => {
                const cartProducts = [];
                for (product of products) {
                    const cartProductData = cart.products.find(
                        prod => prod.id === product.id
                    );
                    if (cartProductData) {
                        cartProducts.push({ productData: product, qty: cartProductData.qty });
                    }
                }
                res.render('shop/cart', {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                });
            })
            .catch((err) => {
                console.log(err)
            })
    });
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