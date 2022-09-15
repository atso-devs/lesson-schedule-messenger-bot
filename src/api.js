const axios = require('axios'),
    baseUrl = 'https://api.vk.com/method/',
    apiVersion = '5.131',
    accessToken = process.env.ACCESS_TOKEN,
    telegramBaseUrl = 'https://api.telegram.org/bot5624618701:AAEmTiZGctRFwVP2DQAQl0t9RYyMq77ycUM'

module.exports = {
    sendMessage: async (message, chatId, messenger) => {
        if (messenger === 'telegram') {
            await axios.post(`${telegramBaseUrl}/sendMessage`, {
                chat_id: chatId,
                text: message
            })
        } else {
            const params = {
                peer_id: chatId,
                access_token: accessToken,
                random_id: Math.floor(Math.random() * 20000000000),
                message: message,
                v: apiVersion,
            }
            await axios.post(baseUrl+'messages.send', {}, { params: params })
        }
    },

    getSchedule: async () => {
        function makeDayScheduleObject(lesson) {
            let [ id, name, begins, ends, type,
                zoomId, zoomPassword, aud, lecturer ] =
                lesson.replace('|', '').split('|').map(item => item.trim())
            return { id, name, begins, ends, type, zoomId, zoomPassword, aud, lecturer }
        }
        const schedule = (await axios.get('https://raw.githubusercontent.com/atso-devs/.github/main/schedule.md')).data

        let scheduleArr = []
        let scheduleMap = new Map()
        schedule.split('##').slice(1, schedule.length).forEach((day, index) => {
            let dayArr = day.trim().split(/\n/)
            let lessons = []
            for (let i=3; i<dayArr.length; i++) {
                lessons.push(makeDayScheduleObject(dayArr[i]))
            }
            scheduleArr.push({
                day: index,
                dayName: dayArr[0].trim(),
                lessons
            })
            scheduleMap.set(dayArr[0].trim(), lessons)
        })
        return scheduleMap
    }
}