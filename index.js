const { post } = require('axios');

exports.WDonateCallback = class {
    constructor (botToken) {
        if(!botToken) throw new Error('WDonate Callback: Вы не передали ключ авторизации (token).');
    
        this.botToken = botToken;

        this.callbacks = [];

        this.fastify = new require('fastify')();

        this.fastify.post('/', request => {
            const { body } = request, { type, payment } = body;

            if(!this.#check(body)) return { status: 'failed' };

            if(type === 'payment' && payment) this.callbacks.map(callback => callback(payment));

            return { status: 'success', ...(type === 'seturl' ? { token: this.botToken } : {}) };
        });
    };

    #check (body) {
        const { sign } = body;

        return (require('js-md5')(['botId','type','date'].reduce((_, key) => (_ + `:${body[key]}`), '') + `:${this.botToken}`) === sign);
    };

    on (callback) {
        if(typeof callback !== 'function') throw new Error('WDonate Callback: Callback must be a function.');

        this.callbacks.push(callback);
    };

    /**
    * @returns {Promise}
    */
    start (port = 3000, host = '0.0.0.0') {
        return this.fastify.listen({ port, host });
    };

    /**
    * @returns {Promise}
    */
    stop () {
        return this.fastify.close();
    };
};

exports.WDonate = class {
    constructor (options = {}) {
        const { token, id } = options;

        if(!token || !id) throw new Error(`WDonate: Вы не передали ${token ? 'VK ID бота (id)' : 'ключ авторизации (token)'}.`);

        this.api = {
            token,
            id,
            url: 'https://wdonate.ru/api/'
        };
    };

    /**
    * @name callApi
    * @description Метод для вызова API.
    * @param {string} method - Вызываемый метод.
    * @param {object} data - Параметры запроса.
    * @returns {Promise}
    */
    callApi (method, data = {}) {
        const { url, token, id } = this.api;

        return post(url + method, { token, botId: id, ...data }).then(({ data: { response } }) => response);
    };

    /**
    * @name getLink
    * @description Метод для создания новой ссылки на оплату.
    * @param {number} userId - ID пользователя.
    * @param {number} sum - Сумма по умолчанию.
    * @param {number} payload - Произвольное число.
    * @see https://www.wdonate.ru/documentation.html
    */
    getLink (userId = 0, sum = 0, payload = 0) {
        return this.callApi('getLink', { userId, sum, payload });
    };

    /**
    * @name getPayments
    * @description Метод для получения истории платежей.
    * @param {number} count - Лимит записей.
    * @see https://www.wdonate.ru/documentation.html
    */
    getPayments (count = 10) {
        return this.callApi('getPayments', { count });
    };

    /**
    * @name getBalance
    * @description Метод для получения текущего баланса.
    * @see https://www.wdonate.ru/documentation.html
    */
    getBalance () {
        return this.callApi('getBalance');
    };

    /**
    * @name getCallback 
    * @description Метод для получения текущего Callback URL.
    * @see https://www.wdonate.ru/documentation.html
    * @see https://wdonate.ru/callback.html
    */
    getCallback () {
        return this.callApi('getCallback');
    };

    /**
    * @name setCallback
    * @description Метод для установки Callback URL.
    * @param {string} callbackUrl - Callback URL.
    * @see https://www.wdonate.ru/documentation.html
    * @see https://wdonate.ru/callback.html
    */
    setCallback (callbackUrl) {
        return this.callApi('setCallback', { callbackUrl });
    };

    /**
    * @name delCallback
    * @description Метод для удаления текущего Callback URL.
    * @see https://www.wdonate.ru/documentation.html
    * @see https://wdonate.ru/callback.html
    */
    delCallback () {
        return this.callApi('delCallback');
    };
};
