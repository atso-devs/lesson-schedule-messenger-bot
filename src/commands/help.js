const api = require('../api')

function createHelpMessage() {
    const { commands } = require('./commands.js')
    let result = `Все доступные команды:\n\n`
    for (const command of commands.values()) {
        const aliases = command.aliases.length ? `Алиасы: /${command.aliases.join(', /')}` : ''
        result += `/${command.name} - ${command.description}.\n${aliases}\n\n`
    }
    return `${result}\n\nДанный список будет дополняться`
}

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Выводит все доступные команды',
    execute: async (peerId) => {
        await api.sendMessage(createHelpMessage(), peerId)
    }
}