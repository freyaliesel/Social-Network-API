const {connect, connection} = require("mongoose");

connect("mongodb://localhost:27017/socialNetworkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection
module.exports = connection;
