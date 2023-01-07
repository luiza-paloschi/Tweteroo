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
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    const signedIn = users.find(user => user.username === tweet.username);
    if (!signedIn){
        return res.sendStatus(401);
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