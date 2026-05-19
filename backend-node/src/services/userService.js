const axios = require("axios");

async function register(user) {

    const response = await axios.post(
        "http://localhost:8080/register",
        user
    );

    return response.data;
}

module.exports = {
    register
};