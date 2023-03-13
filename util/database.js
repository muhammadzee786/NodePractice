const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://piecyfer676:2SMY3lAd7GqNBpBP@cluster0.ahfxo3m.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected')
            _db = client.db()
            callback()
        })
        .catch(err => {
            console.log(err, 'connection error')
            throw err
        })
}

const getDb = () => {
    if (_db){
        return _db
    }
    throw 'No Database Found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb