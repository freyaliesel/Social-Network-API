const { createSecureServer } = require('http2');
const { User } = require('../models');


module.exports = {
// GET all users
    getUsers(req,res) {

    },
// GET single user by _id, populate thought and friend data
    getSingleUser(req, res) {

    },

// POST a new user
    createUser(req, res) {

    },

// PUT to update a user by _id
    editUser(req, res) {

    },

// DELETE to remove user by _id
// BONUS - remove users associated thoughts when deleted
    deleteUser(req, res) {

    },


// POST a new friend to users friend list
    addFriend(req, res){

    },

// DELETE a friend from users friend list
    removeFreidn(req, res) {

    }

}
