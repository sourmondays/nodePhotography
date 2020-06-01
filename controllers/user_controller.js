// USER CONTROLLER 
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// GET / - Get all resources
const index = async (req, res) => {
    const all_users = await models.User.fetchAll();
    res.send({
        status: 'success',
        data: {
            users: all_users
        }
    });
}

// GET /:userId - Get a specific resource 
const show = async (req, res) => {
    const user = await new models.User({ id: req.params.userId })
        .fetch({ withRelated: ['photos'] });
    res.send({
        status: 'success',
        data: {
            user,
        }
    });
}

// POST / - Store a new resource
const store = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Create user request failed validation:", errors.array());
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }
    const validData = matchedData(req);
    // generate a hash of `validData.password`
    try {
        validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown when hashing the password.',
        });
        throw error;
    }
    try {
        const user = await new models.User(validData).save();
        console.log("Created new user successfully:", user);
        res.send({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new user.',
        });
        throw error;
    }
}

// POST /:userId - Update a specific resource
const update = async (req, res) => {
    const userId = req.params.userId;
    const user = await new models.User({ id: userId }).fetch({ require: false });
    if (!user) {
        console.log("User to update was not found.");
        res.status(404).send({
            status: 'fail',
            data: 'User Not Found',
        });
        return;
    }
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Update user request failed validation:", errors.array());
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }
    const validData = matchedData(req);
    try {
        const updatedUser = await user.save(validData);
        console.log("Updated user successfully:", updatedUser);
        res.send({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new user.',
        });
        throw error;
    }
}

// DELETE /:userId - Destroy a specific resource
const destroy = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method Not Allowed.',
    });
}
module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}