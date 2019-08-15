const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Customer = mongoose.model('customers', {
    isGold: Boolean,
    name: {
        type: String,
        requires: true,
        minlength: 3,
        maxlength: 50

    },
    phone: {
        type: String,
        maxlength: 20
    }
});

//GET
router.get('/', async (req, res) => {

    let result = await Customer.find().sort('name');

    res.send(result);
});

//POST
router.post('/', async (req, res) => {

    let { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    let result = await customer.save();

    res.send(result);

});

//PUT
router.put('/:id', async (req, res) => {

    if (!req.params.id) return res.status(400).send('Id should not be empty');

    //    let { error: { details: [{ message }] }, error } = validateCustomer(req.body);
    let { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {

        let customer = await Customer.findByIdAndUpdate(
            {
                _id: req.params.id
            }, {
                isGold: req.body.isGold,
                name: req.body.name,
                phone: req.body.phone

            },
            {
                new: true,
                useFindAndModify: false
            });
        console.log(customer);
        res.send(customer);

    }
    catch (err) {
        res.status(500).send(err);
    }

});

//DELETE

router.delete('/:id', async (req, res) => {

    if (!req.params.id) return res.status(400).send('Id should not be empty');

    let result = await Customer
        .findByIdAndDelete({ _id: req.params.id })
        .catch((err) => res.status(500).send(err));

    res.send(result);

});

//GET 

router.get('/:id', async (req, res) => {

    if (!req.params.id) return res.status(400).send('Id should not be empty');

    let result = await Customer
        .findById({ _id: req.params.id })
        .catch((err) => res.status(500).send(err));

    res.send(result);

});


function validateCustomer(customer) {

    var schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().max(20),
        isGold: Joi.boolean()

    };
    return Joi.validate(customer, schema);
};


module.exports = router;