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
// id - VK ID вашего бота.
const wDonate = new WDonate({ token: process.env.TOKEN, id: process.env.ID });

// Метод для получения текущего баланса.
// Не принимает аргументов.
// Потом вывод ответа или ошибки в консоль (Далее со всеми методами тоже самое).
wDonate.getBalance().then(console.log).catch(console.error);

// Метод для создания новой ссылки на оплату.
// Принимает три аргумента по порядку:
// userId - ID пользователя.
// sum - Сумма по умолчанию.
// payload - Произвольное число.
wDonate.getLink(1, 100, 1234567890).then(console.log).catch(console.error);

// Метод для получения истории платежей.
// count - Лимит записей.
wDonate.getPayments(10).then(console.log).catch(console.error);

// Метод для получения текущего Callback URL.
// Не принимает аргументов.
wDonate.getCallback().then(console.log).catch(console.error);

// Метод для установки Callback URL.
// Принимает один аргумент:
// callbackURL - Callback URL.
wDonate.setCallback('http://example.com/').then(console.log).catch(console.error);

// Метод для удаления текущего Callback URL.
// Не принимает аргументов.
wDonate.delCallback().then(console.log).catch(console.error);


/* Подключение callback. */

// Создаем сервер с токеном бота.
const wDonateCallback = new WDonateCallback(process.env.TOKEN);

// Устанавливаем обработчик, который выполнится, когда придёт пополнение.
// Эта функция выведет объект события в консоль.
wDonateCallback.on(event => console.log(event));

// Запуск сервера на порт 3000 и хост localhost (порт 3000 стоит по умолчанию).
// Потом, если все успешно, пишем в консоль, что сервер запустился, в противном случае выводим ошибку в консоль.
wDonateCallback.start(3000, 'localhost').then(console.log('WDonate Callback has been started.')).catch(console.error);

// Остановка запущенного сервера.
// Потом, если все успешно, пишем в консоль, что сервер остановлен, в противном случае выводим ошибку в консоль.
wDonateCallback.stop().then(console.log('WDonate Callback has been stopped.')).catch(console.error);
```
