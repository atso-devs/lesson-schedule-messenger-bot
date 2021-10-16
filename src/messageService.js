const api = require('./api')

module.exports = {
    testServiceMethod: async (message) => {
        if (message === '/ping')
        return await api.sendMessage('pong')
    }
}