const commands = require('./commands/commands');
const api = require("./api");

module.exports = async function handle(body) {
    if (body.type === 'confirmation') {
        return process.env.vk_confirmation_string
    }

    const command = body.object.message.text.split(' ')[0].trim().replace('/', ''),
        peerId = body.object.message.peer_id,
        date = body.object.message.date;

    if (command in commands) {
        await commands[command].execute(peerId, date)
    } else {
        await api.sendMessage(
            'Неизвестная команда. Воспользуйтесь /help для просмотра всех доступных команд',
            peerId
        )
    }

}