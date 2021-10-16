const api = require('./api')

module.exports = {
    testServiceMethod: async (message, groupId) => {
        return await api.sendMessage(message, groupId)
    }
}