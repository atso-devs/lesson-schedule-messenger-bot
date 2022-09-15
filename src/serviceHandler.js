const { commands, aliases } = require('./commands/commands');
const CommandError = require("./CommandError");

module.exports = async function handle(body, messenger = 'telegram') {
    let message, messageText, chatId, senderId
    if (messenger === 'telegram') {
        message = body.message
        messageText = message.text
        chatId = message.chat.id
    } else {
        message = body.object.message
        messageText = body.object.message.text.trim().toLowerCase();
        chatId = message.peer_id
    }

    const symbols = ['.', '?', '!', ',', ':', ';'];
    
    symbols.map((item) => {
        messageText = messageText.replace(`${item}`, '')
    });

    const command = messageText.split(' ')[0].trim().replace('/', ''),
        args = messageText.split(/\s+/).splice(1);
    
    const cmd = commands.get(command) || commands.get(aliases.get(command))

    if (!cmd) {
        throw new CommandError(
            'Неизвестная команда. Воспользуйтесь /help для просмотра всех доступных команд',
            chatId,
            messenger
        )
    }

    await cmd.execute(message.peer_id, message.date, args, messenger)
}