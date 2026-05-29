import dotenv from 'dotenv'
import  {Telegraf} from 'telegraf';
import axios from 'axios';

console.log(process.cwd())

dotenv.config()
console.log(process.env.APIBOTKEY)
const bot = new Telegraf(process.env.APIBOTKEY)
bot.start((ctx) => ctx.reply("Welcome to my telegram bot, it will help you with your studies and queries"))

bot.command("guide", (ctx)=> ctx.reply(`Hey There. Let's have a quick guide to whatever you want to do. 
- Use /start to start a conversation with me, 
- Use /guide for guide, 
- You can give me images of your query and i will provide you with the solution to the problem, just type /question and then send the image.
- You can ask me for random vocabs to practice. just type /vocabs and i will give you 10 vocabs to practice.
- You can ask me for previous year questions for a topic just type /pyp and then send the topic name only.
`))
// basic work is done.
// a mild setup with a response was done, now next task is to make a api request to some api for a call, maybe a github api
// basic commands that i want are setup, now let's just run a basic query based on a random api and get it's response.
// now we are getting a basic response from the api


// const responseofapi = await axios.get('https://raw.githubusercontent.com/shauryaa108/AuthenSight-AI/refs/heads/main/Frontend/src/pages/Home.jsx')
// bot.command('code', (ctx) => ctx.reply(responseofapi.data))
// console.log(responseofapi.data);

// for clean connection termination
process.once('SIGINT', () => bot.stop('SIGINT'))

// next big task is to implement the api call to the llm to give me 10 random vocabs, store their response in json file
// and then give the tabular or direct message/response.

// comfiguring bot for vocabs
bot.command("vocabs" , async (ctx)=>{
    const prompt = "Give 10 ssc cgl previously asked vocabs with their meaning, don't give innecessary over explained reasioning";
    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model:"qwen2.5:3b",
            prompt,
            stream : false
        }
    );
    ctx.reply(response.data.response)
}
);













bot.launch()