// ALBUM CONTROLLER

const { User, Album } = require('../models');
const { matchedData, validationResult } = require('express-validator');

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

// GET /:albumId - Get a specific resource. 
const getSpecAlbum = async (req, res) => {
    const album = await new Album({ id: req.params.albumId }).fetch({
        withRelated: ["photo"],
    });

    if (req.user.id === album.attributes.user_id) {
        res.send({
            status: 'success',
            album: {
                album,
            }
        });
    } else {
        res.status(404).send({
            status: 'Fail',
            data: "This user doesn't own this album."
        })
    }
};

// POST /albums - Post to authenticated user's albums
const postAlbums = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: 'fail',
            data: errors.array(),
        });
        return;
    }
    const validData = matchedData(req);

    try {
        const album = await new Album(validData).save()
        const userId = req.user.get('id');
        const user = await new User({ id: userId }).fetch({ withRelated: 'albums' });
        const result = await user.albums().attach(album)

        res.send({
            status: 'success',
            data: {
                result,
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

// POST /albums/:albumid/photo - Post photo to album 
const postPhotoInAlbum = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method will be updated soon!',
    });
}

// POST /:albumId - Update a specific resource. 
const update = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method Not Allowed.',
    });
}

// DELETE /:albumId - Destroy a specific resource. 
const destroy = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method Not Allowed.',
    });
}

module.exports = {
    getAlbums,
    getSpecAlbum,
    postAlbums,
    postPhotoInAlbum,
    update,
    destroy,
}
