import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketCollection = "tickets";

const TicketSchema = new Schema({
    code: { type: Schema.Types.String, unique: true, require: true },
    purchase_datetime: { type: Schema.Types.Date, default: Date.now },
    amount: { type: Schema.Types.Number, require: true },
    purchaser: { type: Schema.Types.String, require: true },
});

TicketSchema.plugin(mongoosePaginate);

export default mongoose.model(ticketCollection, TicketSchema);