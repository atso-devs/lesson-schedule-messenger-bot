const api = require("../api");
module.exports = {
    name: 'ping',
    description: 'Проверка бота на доступность',
    execute: async (peerId) => {
        await api.sendMessage('pong', peerId)
    }
}