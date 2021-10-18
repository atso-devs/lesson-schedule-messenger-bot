const api = require('../api')

module.exports = {
    name: 'help',
    description: 'Выводит все доступные команды',
    execute: async (peerId) => {
        await api.sendMessage('help (wip)', peerId)
    }
}