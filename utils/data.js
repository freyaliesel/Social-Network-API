const names = [
    "Smith",
    "Jones",
    "Aaron",
    "Jared",
    "Courtney",
    "Gillian",
    "Clark",
    "Jared",
    "Grace",
    "Kelsey",
    "Tamar",
    "Alex",
    "Mark",
    "Tamar",
    "Farish",
    "Sarah",
    "Nathaniel",
    "Parker",
    "Lisa",
];

const lorum = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "curabitur",
    "vel",
    "hendrerit",
    "libero",
    "eleifend",
    "blandit",
    "nunc",
    "ornare",
    "odio",
    "ut",
    "orci",
    "gravida",
    "imperdiet",
    "nullam",
    "purus",
    "lacinia",
    "a",
    "pretium",
    "quis",
    "et"
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

const getRandomThought = (words) => {
    let thought = "";
    for (let i = 0; i < words; i++) {
        thought += ` ${getRandomWord()}`;
    }
    return thought;
};

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate random users given a number (ex. 10 users === getRandomUsers(10))
const getRandomUsers = (int) => {
    const users = [];
    for (let i = 0; i < int; i++) {
        let name = getRandomArrItem(names) + getRandomArrItem(names);
        users.push({
            username: name,
            email: `${name}@email.com`
        })
    }
    return users;
}

// Export the functions for use in seed.js
module.exports = {
    getRandomUsers,
    getRandomArrItem,
    getRandomThought,
    genRandomIndex,
};
