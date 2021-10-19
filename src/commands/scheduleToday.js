const api = require('../api')

function createLessonString(lesson) {
    return `${lesson.begins}-${lesson.ends} - ${lesson.name}. Аудитория: ${lesson.aud}. ${lesson.lecturer}\n`
}

module.exports = {
    name: 'st',
    description: 'Выводит расписание на сегодня',
    execute: async (peerId, date) => {
        const weekDay = new Date(date*1000).getDay()-1
        const schedule = (await api.getSchedule())[weekDay>4 ? 0 : weekDay],
             lessonList = schedule.lessons.map(lesson => { return createLessonString(lesson) })

        const scheduleMessage = `${schedule.dayName}\n
            ${lessonList.join('\n')} 
        `

        await api.sendMessage(scheduleMessage, peerId)
    }
}