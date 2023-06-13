const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const apiURL = 'http://your-api-url.com/message/';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я бот для отправки сообщений на сервер');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username;
  const message = msg.text;

  // const conferenceId = '<conference_id>';
  const url = `${apiURL}${conferenceId}/append`;
  const data = {
    token: 'YOUR_SERVER_TOKEN',
    user_id: userId,
    user_name: username,
    message: message
  };

  axios.post(url, data)
    .then(() => {
      bot.sendMessage(chatId, 'success');
    })
    .catch((error) => {
      console.error('Erorr:', error);
      bot.sendMessage(chatId, 'Error!');
    });
});
