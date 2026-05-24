const express = require("express");
const router = express.Router();

const userService = require("../services/userService");

router.post("/register", async (req, res) => {

    console.log(req.body);

    try {

        const data = await userService.register(req.body);

        res.status(201).json(data);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Erro ao cadastrar"
        });
    }
});

router.post("/login", async (req, res) => {

    try {

        const data = await userService.login(req.body);

        res.status(200).json(data);

    } catch(err){

        console.log(err);

        res.status(401).json({
            error: "Email ou senha inválidos"
        });
    }

});



module.exports = router;