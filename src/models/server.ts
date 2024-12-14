import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Socket } from 'socket.io';
import Sockets from './sockets';
import cors from 'cors';
import Ticket from './ticket';

class Server {
    private app: Express;
    private port: string;
    private server: HttpServer;
    private io: Socket;
    private sockets: Sockets;

    constructor() {

        //express server
        this.app = express();
        this.port = `${process.env.PORT}`;

        //http server
        this.server = require('http').createServer(this.app);
        //Socket server config
        this.io = require('socket.io')(this.server, {
            cors: { //only enable cors if clients will connect from remote domains or ports besides 'origin'
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        //initialize sockets
        this.sockets = new Sockets(this.io);
    }

    middlewares() {
        this.app.use(express.static(__dirname + '../../../public'));
        this.app.use(cors({ //only enable cors if clients will connect from remote domains or ports besides 'origin'
            origin: '*', // all domains allowed use *
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use('/history', (req, res) => {
            const ticketList: Ticket[] = this.sockets.ticketList.last13Tickets;

            res.json({
                ok: true,
                data: ticketList
            });
        });
    }

    execute() {
        this.middlewares();

        this.server.listen(this.port, () => {
            console.log(`Server Running on port ${this.port}...`);
        })
    }

}

export default Server;