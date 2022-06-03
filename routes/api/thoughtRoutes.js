const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    editThought,
    removeThought,
    createReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
    .route("/:thoughtId")
    .get(getSingleThought)
    .put(editThought)
    .delete(removeThought);

router
    .route("/:thoughtId/reactions")
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;
