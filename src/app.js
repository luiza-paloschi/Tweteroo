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
    if(!user.username || !user.avatar){
        return res.status(400).send("Os campos não estão preenchidos corretamente!")
    }
    users.push(user);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    const signedIn = users.find(user => user.username === tweet.username);
    if (!signedIn){
        return res.sendStatus(401);
    }
    if(!tweet.tweet){
        return res.status(400).send("Não é possível fazer um tweet vazio!")
    }

    tweets.push(tweet);
    res.status(201).send("OK");
});

app.get("/tweets", (_, res) => {
    if (tweets.length === 0){
        return res.send(tweets);
    }

    const newTweets = tweets.map((tweet) => {
        const user = users.find((user) => user.username === tweet.username);
       return {...tweet, avatar: user.avatar};
    })
    const limited = newTweets.filter((_, index) => index > newTweets.length -11);
    res.send(limited);
})

app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`));