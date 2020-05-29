// PROFILE CONTROLLER 

const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');
const models = require('../models');

// GET - Get authenticated user's profile. 
const getProfile = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication BAllE.',
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

// GET /photos - Get the authenticated user's photos.
const getPhotos = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication Required.',
        });
        return;
    }

    // Query db for photos this user has. 
    const userId = req.user.get('id');
    const user = await new User({ id: userId }).fetch({ withRelated: 'photos' });
    const photos = user.related('photos');

    res.send({
        status: 'success',
        data: {
            photos,
        },
    });
}

// GET /albums - Get the authenticated user's albums.
const getAlbums = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication Required.',
        });
        return;
    }

    // Query db for photos this user has. 
    const userId = req.user.get('id');
    const user = await new User({ id: userId }).fetch({ withRelated: 'albums' });
    const albums = user.related('albums');

    res.send({
        status: 'success',
        data: {
            albums,
        },
    });
}

// POST /photos - Post to authenticated user's photos
const postPhotos = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Post photo request failed validation:", errors.array());
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }
    const validData = matchedData(req);

    try {
        const photo = await new models.Photo(validData).save();
        console.log("Created new photo successfully:", photo);
        res.send({
            status: 'success',
            data: {
                photo,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo.',
        });
        throw error;
    }
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
        console.log("Update profile request failed validation:", errors.array());
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }

    const validData = matchedData(req);

    // If request contains password, hash it. 
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
    getPhotos,
    getAlbums,
    postPhotos,
    updateProfile,
}