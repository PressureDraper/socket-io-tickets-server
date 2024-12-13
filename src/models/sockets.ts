import { Socket } from "socket.io";
import TicketList from "./ticket-list";

class Sockets {
    io: Socket;
    ticketList: TicketList;

    constructor(io: Socket) {
        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket: Socket) => {
            console.log('Client connected: ', socket.id, socket.handshake.address);

            socket.on('requestTicket', (data, callback) => {
                const newTicket = this.ticketList.createTicket();
                callback(newTicket);
            });

            socket.on('getNextTicket', (data, callback) => {
                const ticket = this.ticketList.assignTicket(data.username, data.desktop);

                callback(ticket);
            });

            //on disconnected client
            socket.on("disconnect", () => {
                console.log('Client disconnected: ', socket.id, socket.handshake.address, '\n');
            });
        });
    }
}

export default Sockets;