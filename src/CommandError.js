module.exports = class CommandError extends Error {
    constructor(message, peerId, messenger) {
        super();
        this.message = message
        this.peerId = peerId
        this.messenger = messenger
    }
}