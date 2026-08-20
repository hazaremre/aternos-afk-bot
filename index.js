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
  host: 'hpak06.aternos.me',
  port: 50920,
  username: 'AFK_Bot_724',
  version: false // Otomatik sürüm algılamayı zorla
};

function createBot() {
  console.log('Bota bağlanma komutu verildi...');
  const bot = mineflayer.createBot(BOT_CONFIG);

  bot.on('spawn', () => {
    console.log('>>> Bot sunucuya başarıyla katıldı! <<<');
  });

  bot.on('error', (err) => {
    console.log('HATA OLUŞTU:', err);
  });

  bot.on('end', (reason) => {
    console.log('Bot sunucudan ayrıldı. Nedeni:', reason);
    console.log('5 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 5000);
  });
}

createBot();
