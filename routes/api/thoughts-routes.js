const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

router 
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts)

router.route('/:thoughtsId/reactions/')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;