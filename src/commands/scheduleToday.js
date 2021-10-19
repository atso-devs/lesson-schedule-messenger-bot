const api = require('../api')

function createLessonString(lesson) {
    const common = `${lesson.begins}-${lesson.ends} - ${lesson.name}.`
    if (lesson.type === 'zoom') {
        return `${common} ID-конференции: ${lesson.zoomId}. Пароль: ${lesson.zoomPassword}. ${lesson.lecturer}\n`
    }
    return `${common} Аудитория: ${lesson.aud}. ${lesson.lecturer}\n`

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