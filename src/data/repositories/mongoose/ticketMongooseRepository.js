import ticketSchema from "../../models/mongoose/ticketSchema.js";
import { PaginationParameters } from 'mongoose-paginate-v2'

class TicketMongooseRepository {

    async paginate(req) {
        const ticketsDocuments = await ticketSchema.paginate(...new PaginationParameters(req).get());
        ticketsDocuments.docs = ticketsDocuments.docs.map(ticket => ({
            id: ticket._id,
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser,
        }))
        return ticketsDocuments;
    }

    async getOne(id) {
        const ticketDocument = await ticketSchema.findOne({ _id: id });
        if (!ticketDocument) {
            throw new Error('ticket not found.');
        }
        return {
            id: ticketDocument._id,
            code: ticketDocument.code,
            purchase_datetime: ticketDocument.purchase_datetime,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser,
        }
    }

    async create(data) {
        const ticketDocument = await ticketSchema.create(data);
        if (!ticketDocument) {
            throw new Error('ticket not created.');
        }
        return {
            id: ticketDocument._id,
            code: ticketDocument.code,
            purchase_datetime: ticketDocument.purchase_datetime,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser,
        }
    }

    async updateOne(id, data) {
        const ticketDocument = await ticketSchema.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!ticketDocument) {
            throw new Error('ticket not found');
        }
        return {
            id: ticketDocument._id,
            code: ticketDocument.code,
            purchase_datetime: ticketDocument.purchase_datetime,
            amount: ticketDocument.amount,
            purchaser: ticketDocument.purchaser,
        }
    }

    async deleteOne(id) {
        const result = await ticketSchema.deleteOne({ _id: id });
        if (!result) {
            throw new Error('ticket not deleted.')
        }
        return result
    }

}

export default TicketMongooseRepository;
