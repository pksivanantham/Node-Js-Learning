const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//GET
router.get('/', async (req, res) => {

    let result = await Customer.find().sort('name');

    res.send(result);
});

//POST
router.post('/', async (req, res) => {

    let { error } = validate(req.body);

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
router.put('/:id',auth, async (req, res) => {

    if (!req.params.id) return res.status(400).send('Id should not be empty');

    //    let { error: { details: [{ message }] }, error } = validateCustomer(req.body);
    let { error } = validate(req.body);

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

router.delete('/:id',[auth,admin], async (req, res) => {

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

module.exports = router;