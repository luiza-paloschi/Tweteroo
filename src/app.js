import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send("OK!");
})


app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`));