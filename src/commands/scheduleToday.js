const api = require('../api'),
    timeZone = process.env.time_zone*60*60*1000,
    CommandError = require('../CommandError')

function createLessonString(lesson) {
    const common = `${lesson.begins}-${lesson.ends} - ${lesson.name}.`
    if (lesson.type === 'zoom') {
        return `${common} ID-конференции: ${lesson.zoomId}. Пароль: ${lesson.zoomPassword}. ${lesson.lecturer}`
    }
    return `${common} Аудитория: ${lesson.aud}. ${lesson.lecturer}`

}

module.exports = {
    name: 'lessons',
    aliases: ['lsn', 'расписание', 'пары'],
    description: 'Выводит расписание на сегодня',
    execute: async (peerId, date, args) => {
        console.log('execute', new Date().toTimeString())
        if (args.length > 1) {
            throw new CommandError('У этой команды должно быть 0 или 1 аргумент', peerId)
        }

        if (args.length === 0) {
            const weekDay = new Date(date*1000+timeZone).getDay()-1
            const schedule = (await api.getSchedule())[weekDay>4 ? 0 : weekDay<0 ? 0 : weekDay],
                lessonList = schedule.lessons.map(lesson => { return createLessonString(lesson) })

            const scheduleMessage = `${schedule.dayName}\n\n${lessonList.join('\n\n')}`

            await api.sendMessage(scheduleMessage, peerId)
            return
        }

        const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        const indexOfDay = week.indexOf(args[0].toLowerCase())

        if (indexOfDay === -1) {
            throw new CommandError(`Неизвестный день недели или этот день выходной: '${args[0].trim()}'`, peerId)
        }
        
        const schedule = (await api.getSchedule())[indexOfDay],
            lessonList = schedule.lessons.map(lesson => { return createLessonString(lesson) })

        const scheduleMessage = `${schedule.dayName}\n\n${lessonList.join('\n\n')}`

        await api.sendMessage(scheduleMessage, peerId)

    }
}