const express = require("express");

const Product = require("../models/Product");

const router = express.Router();


/*
    GET ALL ACTIVE PRODUCTS
*/

router.get("/", async (req, res) => {

    try {

        const products = await Product.find({
            status: "Active"
        }).sort({
            createdAt: -1
        });


        res.json(products);

    } catch (error) {

        console.error(
            "Public products error:",
            error
        );

        res.status(500).json({
            message: "Failed to load products"
        });

    }

});


module.exports = router;