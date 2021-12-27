const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
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
    .get(getThoughtById)
    .put(updateThoughts)
    .delete(deleteThoughts)

router.route('/:thoughtsId/reactions/')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;