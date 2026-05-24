const axios = require("axios");

async function register(user) {

    const response = await axios.post(
        "http://localhost:8080/register",
        user
    );

    return response.data;
}

async function login(user){

    const response = await axios.post(
        "http://localhost:8080/login",
        user,
        {
            withCredentials: true
        }
    );

    return response.data;
}



module.exports = {
    register,
    login
};

