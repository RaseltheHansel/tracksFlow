import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';


let io: SocketServer;   

export const initSocket = (httpServer: HttpServer): SocketServer => {
    const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173';
    const allowedOrigins = rawClientUrls
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    io = new SocketServer(httpServer, {
        cors: {
            origin: (origin, callback) => {
                if (!origin) return callback(null, true);
                if (allowedOrigins.includes(origin)) return callback(null, true);
                return callback(new Error(`CORS blocked for origin: ${origin}`));
            },
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('Dashboard connected: ', socket.id);

        // real-time events only go to the right dashboard
        socket.on('subscribe_site', (siteId: string) => {
            socket.join(`site:${siteId}`);
            console.log(`Subscribed to site: ${siteId}`);
        });

        socket.on('disconnect', () => {
            console.log('Dashboard disconnected: ', socket.id);
        });
    });

    return io;

};
// getIO lets controllers emit events
export const getIO = (): SocketServer => {
    if(!io) throw new Error('Socket.io not initialized');
    return io;
}
