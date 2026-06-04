const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://127.0.0.1:5500",
            "http://localhost:5500"],  
    credentials: true
}));


app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Node rodando na porta 3000");
});