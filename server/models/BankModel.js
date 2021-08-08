const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: Number,
    category: String,
    vendor: String
})

const Bank = mongoose.model('Bank', transactionSchema)
module.exports = Bank
