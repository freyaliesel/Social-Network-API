const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (v) => `${v.getMonth() + 1}-${v.getDate()}1${v.getFullYear()}`,
        },
        username: {
            type: String,
            required: true,
            // i think i need some sort of validation here? will revisit
        },
        reactions: [{ Reaction }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length}`;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
