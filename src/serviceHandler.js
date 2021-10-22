const commands = require('./commands/commands');
const api = require("./api");

module.exports = async function handle(body) {
    const message = body.object.message.text.trim()

    const command = message.split(' ')[0].trim().replace('/', ''),
        args = message.split(/\s+/).splice(1),
        peerId = body.object.message.peer_id,
        date = body.object.message.date;

    if (command in commands) {
        await commands[command].execute(peerId, date, args)
    } else {
        await api.sendMessage(
            'Неизвестная команда. Воспользуйтесь /help для просмотра всех доступных команд',
            peerId
        )
    }

}