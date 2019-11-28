const Product = require('../models/product.model.js');
const mongoose = require('mongoose');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.body);
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Note
    const product = new Product({
        id: req.body.id, 
        name: req.body.name
    });

    // Save Note in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then( products => res.send(products))
    .catch(err => {
        res.status(500).send({
            message : err.message || "Some err occrd while fetching products"
        })
    })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Product.findOne({id : req.params.productId})
    .then( product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id : " + req.params.productId
            });            
        }
        res.send(product);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id : " + req.params.productId
            });              
        }
        res.status(500).send({
            message : err.message || "Error retrieving product with id : " + req.params.productId
        })
    })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find note and update it with the request body
    // Product.findByIdAndUpdate(req.params.productId, {
    Product.findOneAndUpdate({ id: req.params.productId }, {
        id: req.body.id,
        name: req.body.name
    }, {new: true})
    .then(product => {
        console.log("product"+JSON.stringify(product));
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log("Error "+JSON.stringify(err));
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    // Product.findByIdAndRemove({ id: req.params.productId })
    Product.findOneAndRemove({ id: req.params.productId })
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        console.log("Error "+JSON.stringify(err));
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};