const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    
    res.render('index',{ 

        pageTitle :"Express Demo Page",
        youAreUsingPug:true
    });
    //res.send('Hello Express Js');
});

module.exports =router;