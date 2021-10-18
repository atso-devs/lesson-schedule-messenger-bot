const api = require('./api')

module.exports = {
    sendMessage: async (message, groupId) => {
        return await api.sendMessage(message, groupId)
    }
}