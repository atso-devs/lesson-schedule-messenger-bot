const axios = require('axios'),
    baseUrl = 'https://api.vk.com/method/',
    apiVersion = '5.131',
    accessToken = process.env.access_token

module.exports = {
    sendMessage: async (message, groupId) => {
        const data = {
            peer_id: 2000000000 + groupId,
            access_token: accessToken,
            random_id: Math.floor(Math.random() * 20000000000),
            message: message.text,
            v: apiVersion,
        }
        return await axios.post(baseUrl+'messages.send', {}, { params: data })
    }
}