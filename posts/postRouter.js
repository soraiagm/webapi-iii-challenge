const express = require('express');

const posts = require('./postDb.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('We are in the posts router!');
    next();
});

router.get('/', (req, res) => {
    posts.get(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "The posts information could not be retrieved"
            });
        })
});

// api/posts/:id
router.get('/:id', validatePostId, (req, res) => {
    posts.getById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({
                    message: 'Post not found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error retrieving post'
            });
       });
});

router.delete('/:id', validatePostId, (req, res) => {
    posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: 'The post has been deleted'
                });
            } else {
                res.status(404).json({
                    message: 'The post could not be found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error removing the post'
            });
        });
});

router.put('/:id', validatePostId, (req, res) => {
    posts.update(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'The post could not be found'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error updating the post',
            });
        });
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    posts.getById(id)
        .then(post => {
            if (post) {
                req.post = post;
                next();
            } else {
                res.status(404).json({
                    message: 'No post with given id'
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

module.exports = router;