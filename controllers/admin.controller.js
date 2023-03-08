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
    Product.findByPk(prodId)
        .then((product) => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product',
                {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product
                })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description

    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    })
        .then(result => {
            console.log("Product created successfully!")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const updatedPrice = req.body.price
    const updatedDescription = req.body.description
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription
            return product.save()
        })
        .then(result => {
            console.log("update product successfully")
            res.redirect("/admin/products")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            res.redirect("/admin/products")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products',
                {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: "/admin/products"
                });
        })
        .catch(err => {
            console.log(err)
        })
}