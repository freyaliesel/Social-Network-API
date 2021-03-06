const { User, Thought } = require("../models");

// GET all users
async function getUsers(req, res) {
    try {
        const users = await User.find()
        res.json(users);
        console.log("Sending Users");
    } catch (err) {
        res.status(500).json(err);
    }
}
// GET single user by _id, populate thought and friend data
async function getSingleUser(req, res) {
    try {
        const user = await User.findById(req.params.userId)
        .select('__V')
        .populate({
            path: 'thoughts',
            model: 'Thought'
        })
        .populate({
            path: 'friends',
            model: 'User'
        });
        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
            return
        }
        res.json(user);
        console.log("Sending user", user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST a new user
async function createUser(req, res) {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user);
        console.log("Created user", user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// PUT to update a user by _id
async function editUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            // updates the application
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: "No user with this id!" });
            return
        }
        res.status(201).json(user);
        console.log("Updating User", user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// DELETE to remove user by _id
// BONUS - remove users associated thoughts when deleted
async function deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: "No user with this id!" });
            return
        }
        const thoughts = await Thought.deleteMany({
            _id: { $in: user.thoughts },
        });
        res.status(201).json({ message: "User deleted", user });
    } catch (err) {
        res.status(500).json(err);
    }
}

// POST a new friend to users friend list
async function addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: "No user with this id!" });
            return
        }
        res.json(user);
        console.log("Adding friend", user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// DELETE a friend from users friend list
async function removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: "No user with this id!" });
            return
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    editUser,
    deleteUser,
    addFriend,
    removeFriend,
};
