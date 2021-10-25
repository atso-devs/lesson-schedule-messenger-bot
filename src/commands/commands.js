const files = [
    require('./help'),
    require("./ping"),
    require('./scheduleToday')
]

const commands = new Map()
const aliases = new Map()

for (const command of files) {
    commands.set(command.name, command)
    for (const alias of command.aliases) {
        aliases.set(alias, command.name)
    }
}

module.exports = { commands, aliases }