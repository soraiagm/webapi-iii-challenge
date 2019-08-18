const express = require('express');

const users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
    users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error adding the user'
            });
        });
});

router.post('/:id/posts', validateUserId, (req, res) => {
    const userPost = { ...req.body, user_id: req.params.id };

    users.insert(userPost)
        .then(post => {
            res.status(210).json(post);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding the post'
            });
        });
});

router.get('/', (req, res) => {
    users.get(req.query)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users could not be found'
            });
        });
});

router.get('/:id', validateUserId, (req, res) => {
    users.getById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving user'
            });
        });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    users.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error getting user posts'
            });
        });
});

router.delete('/:id', validateUserId, (req, res) => {
    users.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: 'The user has been deleted'
                });
            } else {
                res.status(404).json({
                    message: 'The user could not be found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error removing the user'
            });
        });
});

router.put('/:id', validateUserId, (req, res) => {
    users.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'The user could not be found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error updating the user',
            });
        });
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    users.getById(id)
        .then(user => {
            if (hub) {
                req.hub = hub;
                next();
            } else {
                res.status(404).json({
                    message: 'No user with given id'
                });
            }
         })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error processing request'
            });
        });
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
