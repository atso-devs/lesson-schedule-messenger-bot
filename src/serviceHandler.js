const { commands, aliases } = require('./commands/commands');
const CommandError = require("./CommandError");

module.exports = async function handle(body) {
    const message = body.object.message,
        messageText = body.object.message.text.trim().toLowerCase();

    const command = messageText.split(' ')[0].trim().replace('/', ''),
        args = messageText.split(/\s+/).splice(1)

    const cmd = commands.get(command) || commands.get(aliases.get(command))

    if (!cmd) {
        throw new CommandError(
            'Неизвестная команда. Воспользуйтесь /help для просмотра всех доступных команд',
            message.peer_id
        )
    }

    await cmd.execute(message.peer_id, message.date, args)
}