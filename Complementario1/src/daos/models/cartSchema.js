import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, index: true, ref: 'products', default: [] }],
  status: { type: Schema.Types.Boolean, default: true }
});

cartSchema.pre('find', function () {
  this.populate(['products']);
});

cartSchema.pre('findOne', function () {
  this.populate(['products']);
});

cartSchema.pre('findOneAndUpdate', function () {
  this.populate(['products']);
});


export default mongoose.model(cartCollection, cartSchema);
