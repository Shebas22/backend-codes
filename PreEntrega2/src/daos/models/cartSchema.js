// import mongoose, { Schema } from "mongoose";

// const cartCollection = 'carts';

// // const productSchema = new Schema(
// //   {
  // //   _id:{ type: Schema.Types.ObjectId, requiere: true, index: true, ref: 'products'},
// //   },
// //   {_id: false}
// // );

// const cartSchema = new Schema({
//   products: [{ type: Schema.Types.ObjectId, index: true, ref: 'products', default:[]}&&{quantity: { type: Schema.Types.Number, default: 1 }}],
//   status: { type: Schema.Types.Boolean, default: true }
// });

// cartSchema.pre('find', function () {
//   this.populate(['products']);
// });

// cartSchema.pre('findOne', function () {
//   this.populate(['products']);
// });

// cartSchema.pre('findOneAndUpdate', function () {
//   this.populate(['products']);
// });


// export default mongoose.model(cartCollection, cartSchema);


import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
  status: {
    type: Boolean,
    default: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id:false
    },
  ],
});

cartSchema.pre('find', function () {
  this.populate(['products.product']);
});

cartSchema.pre('getOne', function () {
  this.populate(['products.product']);
});

cartSchema.pre('findOne', function () {
  this.populate(['products.product']);
});

cartSchema.pre('findOneAndUpdate', function () {
  this.populate(['products.product']);
});


// const Cart = mongoose.model("Cart", cartSchema);

export default mongoose.model(cartCollection, cartSchema);