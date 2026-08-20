const mineflayer = require('mineflayer');
const express = require('express');

// HuggingFace'in kapanmaması için basit web sunucusu
const app = express();
const PORT = process.env.PORT || 7860;

app.get('/', (req, res) => {
  res.send('Aternos Bot Aktif!');
});

app.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// SUNUCU BİLGİLERİ (Aternos IP ve Port)
const BOT_CONFIG = {
  host: 'mudminnow.aternos.host:50920', // Aternos IP'ni yaz
  port: 50920,                           // Aternos Portunu yaz (Varsayılan: 25565)
  username: 'AFK_Bot_724',              // Botun oyundaki adı
  version: '1.21.10' ,                        // Otomatik sürüm tespiti
};

function createBot() {
  const bot = mineflayer.createBot(BOT_CONFIG);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla katıldı!');
    
    // Aternos AFK tespitini yakalanmamak için Smart Anti-AFK
    setInterval(() => {
      // 1. Rastgele Bakış Yönü Değiştirme
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);

      // 2. Rastgele Zıplama
      if (Math.random() > 0.5) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }

      // 3. Eğilip Kalkma
      if (Math.random() > 0.7) {
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 1000);
      }
    }, 4000); // Her 4 saniyede bir rastgele hareket
  });

  // Sunucudan düşerse veya Aternos yeniden başlarsa otomatik tekrar bağlan
  bot.on('end', () => {
    console.log('Bağlantı kesildi, 30 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err);
  });
}

createBot();
