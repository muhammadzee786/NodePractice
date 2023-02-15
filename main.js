const path = require("path");
const express = require("express")
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminData = require("./Routes/admin")
const shopRoutes = require("./Routes/shop")
// var fs = require("fs");
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({
    extended: true
}))

app.use('/admin',adminData)
app.use(shopRoutes)

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

app.listen(8081)
// var data = fs.readFileSync('input.txt')
// const server = http.createServer(app)
//
// server.listen(3000)
// fs.readFile('input.txt', function (err, data) {
//     if(err) return console.log(err)
//     console.log(data.toString())
// })
// console.log(data.toString())
// http.createServer(function (request, response){
//     let url = request.url
//     let method = request.method
//     response.end(method)
// }).listen(8081)


// console.log('Server running at http://127.0.0.1:8081/');