const api = require('../api')

function createLessonString(lesson) {
    return `${lesson.begins}-${lesson.ends} - ${lesson.name}. Аудитория: ${lesson.aud}. ${lesson.lecturer}\n`
}

module.exports = {
    name: 'st',
    description: 'Выводит расписание на сегодня',
    execute: async (peerId) => {
        const serverDate = new Date(Date.now() + 60*60*3*1000)
        const schedule = (await api.getSchedule())[serverDate.getDay()],
             lessonList = schedule.lessons.map(lesson => { return createLessonString(lesson) })

        const scheduleMessage = `${schedule.dayName}\n
            ${lessonList.join('\n')} 
        `

        await api.sendMessage(scheduleMessage, peerId)
    }
}