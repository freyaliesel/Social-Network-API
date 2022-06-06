const connection = require("../config/connection");
const { User, Thought } = require("../models");

const {
    getRandomUsers,
    getRandomArrItem,
    getRandomThought,
    genRandomIndex,
} = require("./data");

// Start the seeding runtime timer
console.time("seeding 🌱");

// Creates a connection to mongodb
connection.once("open", async () => {
    // Delete the entries in the collection
    await User.deleteMany({})
    await Thought.deleteMany({});

    // Arrays for randomly generated users and thoughts
    const users = [...getRandomUsers(10)]
    const thoughts = [];

    // Wait for users to be inserted into the database
    await User.collection.insertMany(users)

    // Makes thoughts array
    const makeThought = (thoughtText) => {
        thoughts.push({
            thoughtText,
            username: getRandomArrItem(users).username,
        });
    };

    // For each of the users that exist, make a random post of 10 words
    users.forEach(() => makeThought(getRandomThought(10)));

    // Wait for the posts array to be inserted into the database
    await Thought.collection.insertMany(thoughts);

    // Log out a pretty table for comments and posts
    console.table(users);
    console.table(thoughts);
    console.timeEnd("seeding 🌱");
    process.exit(0);
});
