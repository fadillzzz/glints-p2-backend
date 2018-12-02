class SocketService {
    constructor(authService) {
        this.authService = authService;
    }

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

    broadcastToRooms(roomIds, event, data) {
        roomIds.forEach(id => {
            this.io.to(id).emit(event, data);
        });
    }
}

module.exports = SocketService;
