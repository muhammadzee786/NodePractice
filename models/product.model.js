const db = require('../util/database')

const Cart = require('./cart.model')

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        return db.execute('INSERT INTO products (title, price, description, imageUrl) values (?,?,?,?)',
            [this.title, this.price, this.description, this.imageUrl])
    }

    updateProduct(id){
        return db.execute('UPDATE products SET title=?, price=?, description=?, imageUrl=?  where id=?', [this.title, this.price, this.description, this.imageUrl, id])
    }

    static deleteById(id) {
        return db.execute('DELETE FROM products where id=?', [id])
    }
    static fetchAll(){
        return db.execute('SELECT * from products')
    }

    static findById (id){
        return db.execute('SELECT * FROM products where id=?',[id])
    }
}