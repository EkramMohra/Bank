const express = require('express')
const router = express.Router()
const Transactions = require('../models/BankModel')

router.post('/transactions', function (request, response) {
    let data = request.body
    let result = {}
    let newTrans = new Transactions({
        category: data.category,
        amount: data.amount,
        vendor: data.vendor
    })
    const savePromise = newTrans.save()
    savePromise.then(saved => {
    }).catch(err => {
        console.log(err)
    })
    result.code = 201
    result.message = "The data inserted successfuly"
    response.send(result)
})

router.get('/transactions', function (req, res) {
    Transactions.find({}).exec(function (err, transactions) {
        res.send(transactions)
    })
})

router.delete('/transactions/:id', function (req, res) {
    let { id } = req.params
    let result = {}
    Transactions.deleteOne({ _id: id })
        .exec((err, success) => {
            if (success === null) {
                result.code = 404
                result.message ="Not found"
                res.send(result)
            } 
            else {
                result.code = 200
                result.message ="Deleted successfuly"
                res.send(result)
            }
        })
})

router.get('/transactions/categories', function (req, res) {
    const aggregate = [
        {
            "$group": {
                "_id": "$category",
                "total": {
                    "$sum": "$amount"
                }
            }
        }
    ]
    Transactions.aggregate(aggregate)
        .exec(function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            res.send(result)
        });
})

module.exports = router
