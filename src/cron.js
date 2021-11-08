const api = require('./api'),
    timeZone = process.env.time_zone*60*60*1000
const axios = require("axios");

const scheduleKeys = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']


function createLessonString(lesson) {
    const common = `@all, пара через 10 минут\n\n${lesson.begins}-${lesson.ends} - ${lesson.name}.`
    if (lesson.type === 'zoom') {
        return `${common} ${lesson.lecturer} - https://us04web.zoom.us/j/${lesson.zoomId}. Пароль: ${lesson.zoomPassword}`
    }
    return `${common} Аудитория: ${lesson.aud}. ${lesson.lecturer}`
}

async function makeLessonQueue() {
    let weekDay = new Date(Date.now()+timeZone).getDay()-1

    weekDay = weekDay>4 ? 0 : weekDay<0 ? 0 : weekDay
    const schedule = (await api.getSchedule()).get(scheduleKeys[weekDay])
    if (!schedule) { return }
    schedule.map( lesson => {
        const [hours, minutes] = lesson.begins.split(':')

        const now = new Date(Date.now())
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours-process.env.time_zone, minutes-10, 0, 0)
        console.log('notification will be in: ', date.toString())
        setTimeout(async () => {
            await api.sendMessage(createLessonString(lesson), 231237066)

        }, Math.abs(date-now))
    })
}


function keepAlive() {
    setInterval(async () => {
        await axios.post(process.env.SERVER_URI, {object: {}}, {})
        console.log('Keep alive')
    }, 15*60*1000)
}

module.exports = {
    start: async () => {
        keepAlive()
        await makeLessonQueue()
        const now = new Date(),
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 0, 0, 0),
            wait = start.getTime() - now.getTime()

        console.log('Time now: ' + new Date(Date.now()).toString())
        console.log('Start in: ' + new Date(Date.now()+wait).toString())
        setTimeout( () => {
            console.log('Cron started: ' + new Date().toString())
            setInterval(async () => {
                await makeLessonQueue()
            }, 86400000)
        }, wait)
    }
}