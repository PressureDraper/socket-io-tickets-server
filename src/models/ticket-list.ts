import Ticket from "./ticket";

class TicketList {
    lastNumber: number;
    pending: Ticket[];
    assigned: Ticket[];

    constructor() {
        this.lastNumber = 0;
        this.pending = [];
        this.assigned = [];
    }

    get nextNumber() {
        this.lastNumber++;
        return this.lastNumber;
    }

    get last13Tickets() {
        return this.assigned.slice(0, 13);
    }

    createTicket() {
        const newTicket = new Ticket(this.nextNumber);
        this.pending.push(newTicket);
        return newTicket;
    }

    assignTicket(agent: string | null, desktop: number | null) {
        if (this.pending.length === 0) {
            return null;
        } else {
            let nextTicket = this.pending.shift()
            nextTicket!.agent = agent;
            nextTicket!.desktop = desktop;

            this.assigned.unshift(nextTicket!);

            return nextTicket;
        }
    }
}

export default TicketList;