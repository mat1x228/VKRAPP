const Discord = require('discord.js');
const axios = require('axios');

const token = 'YOUR_DISCORD_BOT_TOKEN';
const apiURL = 'http://your-api-url.com/message/';

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('message', (message) => {
  if (message.content.startsWith('!append')) {
    const userId = message.author.id;
    const userName = message.author.username;
    const content = message.content.substring('!append'.length).trim();

    const conferenceId = '<conference_id>';
    const url = `${apiURL}${conferenceId}/append`;
    const data = {
      token: 'YOUR_SERVER_TOKEN',
      user_id: userId,
      user_name: userName,
      message: content
    };

    axios.post(url, data)
      .then(() => {
        message.channel.send('Сообщение успешно отправлено на сервер');
      })
      .catch((error) => {
        console.error('Ошибка при отправке сообщения на сервер:', error);
        message.channel.send('Ошибка при отправке сообщения на сервер');
      });
  }
});

client.login(token);
