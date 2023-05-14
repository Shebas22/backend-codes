import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new Schema({
  title: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.Number, require: true },
  thumbnail: [{ type: Schema.Types.Array, require: true, default: [] }],
  code: { type: Schema.Types.String, require: true },
  stock: { type: Schema.Types.Number, require: true },
  status: { type: Schema.Types.Boolean, require: false, default: true },
});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model(productCollection, ProductSchema);
