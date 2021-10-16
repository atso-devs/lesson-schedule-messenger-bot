const axios = require('axios'),
    baseUrl = 'https://api.vk.com/method/',
    apiVersion = '5.131',
    accessToken = process.env.access_token

module.exports = {
    sendMessage: async (message) => {
        const data = {
            user_id: message.from_id,
            access_token: accessToken,
            random_id: Math.floor(Math.random() * 20000000000),
            message: message.text,
            v: apiVersion,
        }
        return await axios.post(baseUrl+'messages.send', {}, { params: data })
    }
}