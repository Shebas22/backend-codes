import container from "../../container.js";

class TicketManager {
    constructor() {
        this.ticketRepository = container.resolve('ticketRepository');
    }

    async paginate(req) {
        return this.ticketRepository.paginate(req);
    }

    async getOne(id) {
        return this.ticketRepository.getOne(id);
    }

    async create(data) {
        return await this.ticketRepository.create(data);
    }

    async updateOne(id, data) {
        return this.ticketRepository.updateOne(id, data);
    }

    async deleteOne(id) {
        return this.ticketRepository.deleteOne(id);
    }
}

export default TicketManager;
