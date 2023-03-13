const path = require("path");
const express = require("express")
const app = express()

const mongoConnect = require('./util/database')

app.set('view engine', 'ejs')
app.set('views', 'views')

const errorController = require('./controllers/error.controller')
const adminData = require("./routes/admin")
// const shopRoutes = require("./routes/shop")
// var fs = require("fs");
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user
    //         next()
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
})

app.use('/admin', adminData)
// app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(8081)
})