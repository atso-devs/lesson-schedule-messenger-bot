const api = require('../api')

function createHelpMessage() {
    const commands = require('./commands.js')
    let result = `Все доступные команды:\n`

    Object.keys(commands).forEach(command => {
        result += `/${commands[command].name} - ${commands[command].description}\n`
    })
    return `${result}\n\nДанный список будет дополняться`
}

module.exports = {
    name: 'help',
    description: 'Выводит все доступные команды',
    execute: async (peerId) => {
        await api.sendMessage(createHelpMessage(), peerId)
    }
}