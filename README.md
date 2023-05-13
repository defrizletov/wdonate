<p align="center"><img src="https://raw.githubusercontent.com/defrizletov/wdonate/main/docs/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/wdonate"><img src="https://img.shields.io/npm/v/wdonate.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/wdonate"><img src="https://img.shields.io/npm/dt/wdonate.svg?style=flat-square" alt="NPM downloads"></a>
</p>

<div align="center">

**Модуль** для удобного использования **[Wdonate API](https://www.wdonate.ru/documentation.html)**.
  
От **[AdepT-Hub](https://adept-hub.ru)** с ❤.

</div>

## 📦 Установка

```sh
npm i wdonate
```

<br/>

## 🚀 Использование

```js
const { WDonate, WDonateCallback } = require('wdonate');

// token - ваш ключ авторизации, полученный в приложении.
// botId - VK ID вашего бота.
const wDonate = new WDonate({ token: process.env.TOKEN, botId: process.env.BOT_ID });

// Запрос для примера, получение баланса нашего аккаунта.
// Потом вывод ответа или ошибки в консоль.
wDonate.getBalance().then(console.log).catch(console.error);

// Подключение callback.

// Создаем сервер с токеном бота.
const wDonateCallback = new WDonateCallback(process.env.TOKEN);

// Устанавливаем обработчик, который выполнится, когда придёт пополнение.
// Эта функция выведет объект события в консоль.
wDonateCallback.on(event => console.log(event));

// Запуск сервера на порт 3000 и хост localhost (порт 3000 стоит по умолчанию).
// Потом, если все успешно, пишем в консоль, что сервер запустился, в противном случае выводим ошибку в консоль.
wDonateCallback.start(3000, 'localhost').then(console.log('WDonate Callback has been started.')).catch(console.error);
```
