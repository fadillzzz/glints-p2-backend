class SocketService {
    /**
     * @param {AuthService} authService
     */
    constructor(authService) {
        this.authService = authService;
    }

    /**
     * @param {Object} io An isntance of socket.io
     * @return {this}
     */
    setIo(io) {
        this.io = io;
        return this;
    }

    init() {
        this.io.on('connection', socket => {
            socket.on('auth', async token => {
                const userId = await this.authService.getUserIdFromToken(token);

                if (userId) {
                    // The await here seems to be necessary to trigger the execution
                    // despite the documentation implying a callback is optional
                    await socket.join(userId);
                }
            });
        });
    }

    /**
     * Broadcast an event with some data to the specified rooms
     *
     * @param {String[]} roomIds
     * @param {String} event
     * @param {mixed} data
     */
    broadcastToRooms(roomIds, event, data) {
        roomIds.forEach(id => {
            this.io.to(id).emit(event, data);
        });
    }
}

module.exports = SocketService;
