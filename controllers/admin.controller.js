const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
        })
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/")
    }
    const prodId = req.params.productId
    Product.findById(prodId)
        .then(([product]) => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product[0]
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    const product = new Product(null, title, imageUrl, price, description)
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription)
    updatedProduct.updateProduct(prodId)
        .then(() => {
            res.redirect("/admin/products")
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
        .then(() => {
            res.redirect("/admin/products")
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('admin/products',
                {
                    prods: rows,
                    pageTitle: 'Admin Products',
                    path: "/admin/products"
                });
        })
        .catch((err) => {
            console.log(err)
        })
}