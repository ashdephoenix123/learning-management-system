import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
            cors: {
                origin: process.env.NEXT_PUBLIC_HOST,
                methods: ["GET", "POST"],
                credentials: true
            }
        })


        res.socket.server.io = io;

        io.on('connection', (socket) => {
            socket.on('send-message', (obj) => {
                io.emit('receive-message', obj)
            })
        })
    }
    res.end()
}

export default SocketHandler