const { User, Thoughts } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                { path: 'thoughts', select: "-__v" },
                { path: 'frineds', select: "-__v" }
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thoughts.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: ' User has been deleted.' });
                            })
                            .catch(err => res.status(400).json(err));
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $addToSet: { friends: params.userId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found with this Id' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'User not found with this friendId' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));

    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found with this userId' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserData2 => {
                        if (!dbUserData2) {
                            res.status(404).json({ message: 'User not found with this friendId' })
                            return;
                        }
                        res.json({ message: 'User not found with this friendId' });
                        return;
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;