const { commands, aliases } = require('./commands/commands');
const CommandError = require("./CommandError");

module.exports = async function handle(body, messenger = 'telegram') {
    let message, messageText, chatId, date, senderId
    if (messenger === 'telegram') {
        if (body.hasOwnProperty('edited_message') || body.hasOwnProperty('my_chat_member')) return
        message = body.message
        messageText = message?.text
        chatId = message.chat.id
        senderId = +message.from.id
    } else {
        message = body.object.message
        messageText = body.object.message.text.trim().toLowerCase();
        chatId = message.peer_id
    }
    date = message.date

    if (!messageText) return

    if (senderId === 801422391) {
        throw new CommandError(decodeURIComponent(escape('\xD0\x9F\xD0\xBE\xD1\x88\xD0\xB5\xD0\xBB\x20\xD0\xBD\xD0\xB0\xD1\x85\xD1\x83\xD0\xB9\x2E\x20\xD0\xA1\xD0\xBC\xD0\xBE\xD1\x82\xD1\x80\xD0\xB8\x20\xD1\x80\xD0\xB0\xD1\x81\xD0\xBF\xD0\xB8\xD1\x81\xD0\xB0\xD0\xBD\xD0\xB8\xD0\xB5\x20\xD0\xB2\x20\xD0\xBF\xD0\xBE\xD1\x81\xD0\xBB\xD0\xB5\xD0\xB4\xD0\xBD\xD0\xB5\xD0\xBC\x20\xD0\xB4\xD0\xBE\xD0\xBA\xD1\x83\xD0\xBC\xD0\xB5\xD0\xBD\xD1\x82\xD0\xB5\x20\xD0\xB2\x20\xD0\xB2\xD0\xB0\xD1\x82\xD1\x81\xD0\xB0\xD0\xBF\x2E\x20\xD0\x90\x20\xD0\xBA\xD0\xB0\xD0\xBA\x20\xD1\x82\xD1\x8B\x20\xD1\x85\xD0\xBE\xD1\x82\xD0\xB5\xD0\xBB\x2C\x20\xD1\x87\xD1\x82\xD0\xBE\x20\xD0\xB1\xD1\x8B\x20\xD1\x8F\x20\xD1\x80\xD0\xBE\xD0\xBD\xD1\x8F\xD1\x8F\x20\xD0\xBA\xD0\xB0\xD0\xBB\x2C\x20\xD1\x80\xD0\xB0\xD1\x81\xD0\xBF\xD0\xB8\xD1\x81\xD0\xB0\xD0\xBD\xD0\xB8\xD0\xB5\x20\xD1\x82\xD0\xB5\xD0\xB1\xD0\xB5\x20\xD0\xBF\xD0\xBE\xD0\xBA\xD0\xB0\xD0\xB7\xD0\xB0\xD0\xBB\x3F')), chatId, messenger)
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