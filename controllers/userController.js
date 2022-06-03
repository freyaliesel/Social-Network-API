const { User, Thought } = require("../models");

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET single user by _id, populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // PUT to update a user by _id
    editUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // updates the application
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE to remove user by _id
    // BONUS - remove users associated thoughts when deleted
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : Thought.deleteMany({
                        _id: { $in: user.thoughts },
                    })
            )
            .then(() =>
                res.json({ message: "User and associated thoughts deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST a new friend to users friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId} },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No user with this id!" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // DELETE a friend from users friend list
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId},
            { $pull: { friends: { _id: req.params.friendId }}})
    },
};
