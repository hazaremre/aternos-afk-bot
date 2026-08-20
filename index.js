const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot Aktif!');
});

app.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// Aternos panelinde görünen TAM adresi ve Portu buraya yaz
const ATERNOS_DOMAIN = '185.107.193.108'; 
const ATERNOS_PORT = 50920;

function createBot() {
  console.log('Sunucuya bağlanmayı deniyor...');

  const bot = mineflayer.createBot({
    host: ATERNOS_DOMAIN,
    port: ATERNOS_PORT,
    username: 'AFK_Bot_724',
    version: false, // Sunucu sürümünü otomatik algılar
    auth: 'offline',
    checkTimeoutInterval: 60000,
    keepAlive: true
  });

  bot.on('spawn', () => {
    console.log('>>> BOT SUNUCUYA BAŞARIYLA KATILDI! <<<');
    // Aternos'un AFK atmasını önlemek için ufak bir baş sallama hareketi
    setInterval(() => {
      if (bot) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 60000);
  });

  bot.on('error', (err) => {
    console.log('Bağlantı Hatası:', err.message);
  });

  bot.on('end', (reason) => {
    console.log('Bağlantı koptu. Nedeni:', reason);
    console.log('15 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 15000);
  });
}

createBot();
