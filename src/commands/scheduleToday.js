const api = require('../api'),
    timeZone = process.env.time_zone*60*60*1000,
    CommandError = require('../CommandError'),
    { sendMessage } = require("../api");

const schedule = api.getSchedule(),
    scheduleKeys = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']

function createLessonString(lesson) {
    const common = `${lesson.begins}-${lesson.ends} - ${lesson.name}.`
    if (lesson.type === 'zoom') {
        return `${common} ID-конференции: ${lesson.zoomId}. Пароль: ${lesson.zoomPassword}. ${lesson.lecturer}`
    }
    return `${common} Аудитория: ${lesson.aud}. ${lesson.lecturer}`
}

async function getDayLesson(dayKey) {
    return (await schedule).get(dayKey)
}


module.exports = {
    name: 'lessons',
    aliases: ['lsn', 'расписание', 'пары'],
    args: [
        {
            name: 'weekDay',
            required: false,
            caseSensitive: false,
            variants: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
                'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресение',
                'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su',
                'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
        }
    ],
    description: 'Выводит расписание на сегодня',
    execute: async (peerId, date, cmdArgs) => {
        const { args } = require("./scheduleToday");

        if (cmdArgs.length > args.length) {
            throw new CommandError('У этой команды должно быть 0 или 1 аргумент', peerId)
        }

        if (!cmdArgs.length) {
            let weekDay = new Date(date*1000+timeZone).getDay()-1
            weekDay = weekDay>4 ? 0 : weekDay<0 ? 0 : weekDay

            const daySchedule = (await schedule)
                .get(scheduleKeys[weekDay]),
                lessonList = daySchedule.map(lesson => { return createLessonString(lesson) }),
                scheduleMessage = `${scheduleKeys[weekDay]}\n\n${lessonList.join('\n\n')}`

            await sendMessage(scheduleMessage, peerId)
            return
        }

        const dayArg = args[0],
            day = dayArg.caseSensitive ? cmdArgs[0] : cmdArgs[0].toLowerCase(),
            dayKey = scheduleKeys[dayArg.variants.indexOf(day)%7],
            daySchedule = (await api.getSchedule()).get(dayKey)

        if (!daySchedule) {
            throw new CommandError(`Неизвестный день недели или этот день выходной: '${cmdArgs[0].trim()}'`, peerId)
        }

        const lessonList = daySchedule.map(lesson => { return createLessonString(lesson) }),
            scheduleMessage = `${dayKey}\n\n${lessonList.join('\n\n')}`

        await sendMessage(scheduleMessage, peerId)
    }
}