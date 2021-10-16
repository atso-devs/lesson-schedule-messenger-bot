const api = require('./api')

module.exports = {
    testServiceMethod: async (message) => {
        return await api.sendMessage(message)
    }
}