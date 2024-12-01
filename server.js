const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const photoPath = './yandex_go.jpg';

if (!fs.existsSync(photoPath)) {
    console.error(`Fayl topilmadi: ${photoPath}`);
}
// Bot tokeningiz
const token = 'YOUR_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Foydalanuvchi tanlagan tilni saqlash uchun
const userLanguages = {};

// /start buyrug'ini tutuvchi handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Tilni tanlash keyboard'ini yuborish
  bot.sendMessage(chatId, "Tilni tanlang:\nВыберите язык:\nChoose a language:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "O'zbekcha", callback_data: 'lang_uz' },
          { text: "Русский", callback_data: 'lang_ru' },
          { text: "English", callback_data: 'lang_en' },
        ],
      ],
    },
  });
});
bot.onText(/\/options/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Tilni tanlang:\nВыберите язык:\nChoose a language:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "O'zbekcha", callback_data: 'lang_uz' },
          { text: "Русский", callback_data: 'lang_ru' },
          { text: "English", callback_data: 'lang_en' },
        ],
      ],
    },
  }).catch((error) => {
    console.error(`Xabar yuborishda xato: ${error.message}`);
  });
});
// /help buyrug'ini tutib olish
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  // Yuboriladigan matnni aniqlash
  const helpMessage = `
    Botdan foydalanish bo'yicha yordam:
    1. /start - Botni ishga tushirish.
    2. /options - Tilni tanlash.
    3. /help - Yordam xabarini olish.

    Agar savollaringiz bo‘lsa, administrator bilan bog‘laning. 😊
    @tuit_o1
    
    Barcha akkauntlarim: 
    https://taplink.cc/abdugaffor

    instagram: 
    https://www.instagram.com/promokod_yandeks?igsh=MXhtcHgyajYxanB5bA%3D%3D&utm_source=qr

    Instagramingizni rivojlantirish sirlari ushbu kanalda:
    @sirli_insta
  `;

  // Yordam matnini foydalanuvchiga yuborish
  bot.sendMessage(chatId, helpMessage).catch((error) => {
    console.error(`Xabar yuborishda xato: ${error.message}`);
  });
});

// Callbackni tutib olish
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Til tanlanganda
  if (data.startsWith('lang_')) {
    const lang = data.split('_')[1]; // Til kodi (uz, ru, en)
    userLanguages[chatId] = lang; // Foydalanuvchining tilini saqlash

    // Foydalanuvchiga tanlovni yuborish
    const messages = {
      uz: "Tanlang:",
      ru: "Выберите:",
      en: "Choose:",
    };

    bot.sendMessage(chatId, messages[lang], {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Yandex Go', callback_data: 'service_yandex_go' },
            { text: 'Uzum Tezkor', callback_data: 'service_uzum_tezkor' },
          ],
          [
            { text: 'Uzum Market', callback_data: 'service_uzum_market' },
            { text: 'Yandex Plus', callback_data: 'service_yandex_plus' },
          ],
          [
            { text: 'Oqtepa Lavash', callback_data: 'service_oqtepa_lavash' },
          ],
        ],
      },
    });
  }

  // Xizmat tanlanganda
  else if (data.startsWith('service_')) {
    // const service = data.split('_')[1]; // Xizmat nomi
    const service = data.split('_').slice(1).join('_'); // Bu 'yandex_go' ni qaytaradi.


    const photos = {
      yandex_go: './yandex_go.jpg',
      uzum_tezkor: './uzum_tezkor.jpg',
      uzum_market: './uzum_market.jpg',
      yandex_plus: './yandex_plus.jpg',
      oqtepa_lavash: './oqtepa_lavash.jpg',
    };

    const captions = {
      uz: {
        yandex_go: "Ushbu havola orqali buyurtma bering : https://go-yandex.prfl.me/promokod_yandeks/2wjl4n  \nPromokod: ZZ8Y7C \n@yandeks_telegram",
        uzum_tezkor: "Ushbu havola orqali buyurtma bering : https://uzumtezkor.uz/uz  \nPromokod: YXLTD \n@yandeks_telegram",
        uzum_market: "Ushbu havola orqali buyurtma bering : https://uzum.uz/uz  \nPromokod: X3P482K \n@yandeks_telegram",
        yandex_plus: "Ushbu havola orqali buyurtma bering : https://ypls-eats.prfl.me/promokod_yandeks/qzs0a9  \nPromokod: 25E244Q97T \n@yandeks_telegram",
        oqtepa_lavash: "Ushbu havola orqali buyurtma bering : T.me//oqtepalavash_bot  \nPromokod: ZZ8Y7C \n@yandeks_telegram",
      },
      ru: {
        yandex_go: "Заказывайте по этой ссылке: https://go-yandex.prfl.me/promokod_yandex/2wjl4n \nПромокод: ZZ8Y7C \n@yandeks_telegram",
        uzum_tezkor: "Заказывайте по этой ссылке: https://uzumtezkor.uz/ru \nПромокод: YXLTD \n@yandeks_telegram",
        uzum_market: "Заказывайте по этой ссылке: https://uzum.uz/ru \nПромокод: X3P482K \n@yandeks_telegram",
        yandex_plus: "Заказывайте по этой ссылке: https://ypls-eats.prfl.me/promokod_yandeks/qzs0a9 \nПромокод: 25E244Q97T \n@yandeks_telegram",
        oqtepa_lavash: "Заказывайте по этой ссылке: T.me//oqtepalavash_bot \nПромокод: 25E244Q97T \n@yandeks_telegram",
      },
      en: {
        yandex_go: "Order through this link: https://go-yandex.prfl.me/promokod_yandeks/2wjl4n \nPromocode: ZZ8Y7C \n@yandeks_telegram",
        uzum_tezkor: "Order through this link: https://uzumtezkor.uz/ru  \nPromocode: YXLTD \n@yandeks_telegram",
        uzum_market: "Order through this link: https://uzum.uz  \nPromocode: X3P482K \n@yandeks_telegram",
        yandex_plus: "Order through this link: https://ypls-eats.prfl.me/promokod_yandeks/qzs0a9 \nPromocode: 25E244Q97T \n@yandeks_telegram",
        oqtepa_lavash: "Order through this link: T.me//oqtepalavash_bot \nPromocode: 25E244Q97T \n@yandeks_telegram",
      },
    };

    const userLang = userLanguages[chatId] || 'uz'; // Til tanlanmagan bo'lsa, o'zbekcha
    const caption = captions[userLang][service];
    bot.answerCallbackQuery(query.id, { text: "Xizmatni tanladingiz.", show_alert: false });
    // Rasm va caption bilan birga "Orqaga" tugmasi
    bot.sendPhoto(chatId, fs.createReadStream(photos[service]), {
      caption: caption,
      reply_markup: {
        inline_keyboard: [
          [{ text: userLang === 'uz' ? 'Orqaga' : userLang === 'ru' ? 'Назад' : 'Back', callback_data: 'go_back' }],
        ],
      },
    });
  }

  // "Orqaga" tugmasi bosilganda
  else if (data === 'go_back') {
    const userLang = userLanguages[chatId] || 'uz'; // Til tanlanmagan bo'lsa, o'zbekcha
    const messages = {
      uz: "Tanlang:",
      ru: "Выберите:",
      en: "Choose:",
    };

    bot.answerCallbackQuery(query.id, { text: "Asosiy menyuga qaytdingiz.", show_alert: false });
    bot.sendMessage(chatId, messages[userLang], {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Yandex Go', callback_data: 'service_yandex_go' },
            { text: 'Uzum Tezkor', callback_data: 'service_uzum_tezkor' },
          ],
          [{ text: 'Uzum Market', callback_data: 'service_uzum_market' },
            { text: 'Yandex Plus', callback_data: 'service_yandex_plus' },
          ],
          [
            { text: 'Oqtepa Lavash', callback_data: 'service_oqtepa_lavash' },
          ],
        ],
      },
    });
  }
});
