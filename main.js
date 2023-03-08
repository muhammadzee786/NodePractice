const path = require("path");
const express = require("express")
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const sequelize = require('./util/database')
const Product = require('./models/product.model')
const User = require('./models/user.model')

const errorController = require('./controllers/error.controller')
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")
// var fs = require("fs");
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({
    extended: true
}))

app.use('/admin', adminData)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize.sync({force: true})
    .then(result => {
        app.listen(8081)
    })
    .catch(err => {
        console.log(err)
    })
