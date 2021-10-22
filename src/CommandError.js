module.exports = class CommandError extends Error {
    constructor(message, peerId) {
        super();
        this.message = message
        this.peerId = peerId
    }
}