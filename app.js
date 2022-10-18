import { } from 'dotenv/config';
import express from 'express';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TelegramBotToken);
const app = express();

// Set the bot API endpoint
app.use(
  await bot.createWebhook({
    domain: process.env.WebhookDomain,
  })
);

bot.on('channel_post', async (ctx) => {
  const text = ctx.channelPost.text;
  if (!text.match(/(?<=[\s,.:;"']|^)[пП]ут[и,і]н/gm)) {
    console.log('there is no match')
    return

  } 

  const editedText = text.replace(/(?<=[\s,.:;"']|^)[пП]ут[и,і]н/gm, function (match) {
    const firstLetter = match[0] === 'П' ? 'Х' : 'х';
    const rest = match.slice(2);
    return `${firstLetter}ую${rest}`;
  });

  await ctx.telegram.editMessageText(
    ctx.channelPost.chat.id,
    ctx.channelPost.message_id,
    undefined,
    editedText
  );

});

const PORT = process.env.port || 9630

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
