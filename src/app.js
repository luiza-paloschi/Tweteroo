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

app.post("/tweets", (req, res) => {
    const tweet = req.body;
    const signedIn = users.find(user => user.username === tweet.username);
    if (!signedIn){
        console.log("aaaaaaaa")
        return res.send("UNAUTHORIZED")
    }
    tweets.push(tweet);
    res.send("OK!");
})

app.get("/tweets", (_, res) => {
    if (tweets.length === 0){
        return res.send(tweets);
    }

    const newTweets = tweets.map((item) => { 
       return {...item, avatar: users[0].avatar};
    })
    const limited = newTweets.filter((item, index) => index > newTweets.length -11);
    console.log(limited)
    res.send(limited);
})

app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`));