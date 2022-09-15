const { commands, aliases } = require('./commands/commands');
const CommandError = require("./CommandError");

module.exports = async function handle(body, messenger = 'telegram') {
    let message, messageText, chatId, date, senderId
    if (messenger === 'telegram') {
        if (body.hasOwnProperty('edited_message')) return
        message = body.message
        messageText = message.text
        chatId = message.chat.id
        senderId = +message.from.id
    } else {
        message = body.object.message
        messageText = body.object.message.text.trim().toLowerCase();
        chatId = message.peer_id
    }
    date = message.date

    if (senderId === 879579041) {
        throw new CommandError(/\xd0\xbf\xd1\x80\xd0\xb8\xd0\xb2\xd0\xb5\xd1\x82/, chatId, messenger)
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

    await cmd.execute(chatId, date, args, messenger)
}