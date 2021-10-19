const api = require("../api");
module.exports = {
    name: 'ping',
    description: 'Проверка бота на доступность, возвращает строку \'pong\'',
    execute: async (peerId) => {
        await api.sendMessage('pong', peerId)
    }
}