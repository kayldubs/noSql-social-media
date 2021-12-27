const { User, Thoughts, Reaction } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message:'No thought found witht this ID'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThoughts({ body }, res) {
        Thoughts.create(body)
        .then(dbThoughtsData => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtsData._id } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThoughts({ params}, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'There is no thought found with this Id'});
                return;
            }
            User.findOneAndUpdate(
                { username: dbThoughtsData.username },
                { $pull: {thoughts: params.id } }
            )
            .then(() => {
                res.json({ message: 'Thought has been deleted'});
                return;
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    addReaction ({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this Id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true } 
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No reaction found with this ID'});
                return;
            }
            res.json({ message: ' Reaction has been deleted'});
        })
        .catch(err => res.status(500).json(err));
    },
}

module.exports = thoughtsController