const { User, Thought, Reaction } = require("../models");

// GET all thoughts
async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        console.log("Retrieving all thoughts", thoughts);
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET single thought by _id
async function getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        if (!thought) {
            console.log("No thought found");
            res.status(404).json({ message: "No thought with that ID" });
            return
        }
        console.log("Retrieving thought", thought);
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// POST new thought - and push thought's _id to the users's thought array
async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        console.log("Created thought", thought);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({
                message: "Thought created, but found no user. Deleted thought",
            });
            const delThought = Thought.findOneAndRemove({
                _id: thought._id,
            });
        }
        res.status(201).json({ user, thought });
        console.log("Thought created and user updated", user, thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// PUT to update a thought by _id
async function editThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
            return
        }
        console.log("Editing thought", thought);
        res.status(201).json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// DELETE a thought by _id
async function removeThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove({
            _id: req.params.thoughtId,
        });
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
        }
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({
                message: "Thought created but no user with this id!",
            });
        }
        res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// POST a reaction stored in a thought's reactions array
async function createReaction(req, res) {
    try {
        await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with this id!" });
                return
            }
            console.log("Adding new reaction", thought);
            res.status(201).json(thought );
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE to pull and remove a reaction by reactionId
async function removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({ message: "No thought with this id!" });
            return
        }
        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    editThought,
    removeThought,
    createReaction,
    removeReaction,
};
