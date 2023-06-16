import mongoose, { Schema } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  status: {
    type: Boolean,
    default: true,
  },
  products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
});

cartSchema.pre("create", function () {
  this.populate(["products.id"]);
});

cartSchema.pre("find", function () {
  this.populate(["products.id"]);
});

cartSchema.pre("getOne", function () {
  this.populate(["products.id"]);
});

cartSchema.pre("findOne", function () {
  this.populate(["products.id"]);
});

cartSchema.pre("findOneAndUpdate", function () {
  this.populate(["products.id"]);
});

export default mongoose.model(cartCollection, cartSchema);
