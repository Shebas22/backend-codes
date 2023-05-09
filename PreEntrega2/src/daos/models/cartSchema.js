import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const productSchema = new Schema(
  {
  _id:{ type: Schema.Types.ObjectId, requiere: true, index: true, ref: 'products'},
  },
  {_id: false}
);

const cartSchema = new Schema({
  products: [productSchema&&{quantity: { type: Schema.Types.Number, require:true, default: 1 }}],
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
