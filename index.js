const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('AFK Bot Aktif!');
});

app.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// SUNUCU BİLGİLERİ
const BOT_CONFIG = {
  host: '185.107.193.108',
  port: 50920,
  username: 'AFK_Bot_724',
  version: '1.21.1',
  auth: 'offline',
  checkTimeoutInterval: 30000
};

function createBot() {
  console.log('Bota bağlanma komutu verildi...');
  
  const bot = mineflayer.createBot(BOT_CONFIG);

  bot.on('login', () => {
    console.log('Bot sunucuya giriş yaptı, dünyayaya yükleniyor...');
  });

  bot.on('spawn', () => {
    console.log('>>> BOT SUNUCUYA BAŞARIYLA KATILDI! <<<');
  });

  bot.on('kicked', (reason) => {
    console.log('Bot sunucudan atıldı:', reason);
  });

  bot.on('error', (err) => {
    console.log('HATA OLUŞTU:', err.message);
  });

  bot.on('end', (reason) => {
    console.log('Bağlantı koptu. Nedeni:', reason);
    console.log('10 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 10000);
  });
}

createBot();
