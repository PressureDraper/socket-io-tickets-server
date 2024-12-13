import { v4 } from "uuid";

class Ticket {
    id: string;
    number: number;
    desktop: number | null;
    agent: string | null;

    constructor(number: number) {
        this.id = v4();
        this.number = number;
        this.desktop = null;
        this.agent = null;
    }
}

export default Ticket;