// PROFILE CONTROLLER 

const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');

// GET - Get authenticated user's profile. 
const getProfile = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication Required.',
        });
        return;
    }

    res.send({
        status: 'success',
        data: {
            user: req.user,
        }
    });
}


// PUT - Update the authenticated user's profile. 
const updateProfile = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication Required.',
        });
        return;
    }

    // Finds the validation errors in this request and wraps them in an object with handy functions. 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }

    const validData = matchedData(req);

    // If request contains password, do a hash! 
    if (validData.password) {
        try {
            validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds)
        } catch (err) {
            res.status(500).send({
                status: 'error',
                message: 'Exception thrown when hashing the password.',
            });
            throw error;
        }
    }

    try {
        const updatedUser = await req.user.save(validData);

        res.send({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating profile.',
        });
        throw error;
    }
}

module.exports = {
    getProfile,
    updateProfile,
}