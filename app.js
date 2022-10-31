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
  const regExp = /(?<=[\s,.:;"']|^)п\s*у\s*т\s*[иі]\s*н/gmi
  const matches = text.match(regExp)

  if (!matches) {
    return
  }

  const editedText = text.replaceAll(regExp, match => {
    const newMatch = match.replaceAll(/\s/gmi, "")
    return "Хую" + newMatch.slice(2).toLowerCase()
  })
    await ctx.telegram.editMessageText(
      ctx.channelPost.chat.id,
      ctx.channelPost.message_id,
      undefined,
      editedText
    );

  });

  const PORT = process.env.port || 9630

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
