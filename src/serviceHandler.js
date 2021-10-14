const messageService = require('./messageService')

module.exports = async function handle(body) {
    if (body.type === 'confirmation') {
        return process.env.vk_confirmation_string
    } else
        return await messageService.testServiceMethod(body.message)
}