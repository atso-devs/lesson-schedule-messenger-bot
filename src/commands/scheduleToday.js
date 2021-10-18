const api = require('../api')

function createLessonString(lesson) {
    return `${lesson.begins}-${lesson.ends} - ${lesson.name}. Аудитория: ${lesson.aud}. ${lesson.lecturer}\n`
}

module.exports = {
    name: 'st',
    description: 'Выводит расписание на сегодня',
    execute: async (peerId) => {
        const schedule = (await api.getSchedule())[new Date(new Date().setHours(new Date().getHours() + 3)).getDay()-1],
             lessonList = schedule.lessons.map(lesson => { return createLessonString(lesson) })

        const scheduleMessage = `${schedule.dayName}\n
            ${lessonList.join('\n')} 
        `

        await api.sendMessage(scheduleMessage, peerId)
    }
}