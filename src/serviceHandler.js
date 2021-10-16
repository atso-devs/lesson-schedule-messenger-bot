const messageService = require('./messageService')

module.exports = async function handle(body) {
    if (body.type === 'confirmation') {
        return process.env.vk_confirmation_string
    } else {
        if (body.object.message.text === '/ping') {
            body.object.message.text = 'pong'
        } else {
            body.object.message.text = 'Неизвестная команда'
        }
        return await messageService.testServiceMethod(body.object.message)
    }
}