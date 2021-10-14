const axios = require('axios'),
    baseUrl = 'https://api.vk.com/method/',
    apiVersion = '5.131',
    accessToken = process.env.access_token

module.exports = {
    sendMessage: async (message) => {
        return await axios.post(baseUrl+'messages.send', {a: 234}, { params: {
                user_id: 231237066,
                access_token: accessToken,
                random_id: Math.floor(Math.random() * 20000000000),
                message: message.text,
                v: apiVersion,
            } })
    }
}