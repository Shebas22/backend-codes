import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = "carts";

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number, required: true },
  carts: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        required: true,
      },
    },
  ],
  role: { type: Schema.Types.ObjectId, index: true, ref: "roles" },
  isAdmin: { type: Schema.Types.Boolean, default: false },
  password: { type: Schema.Types.String, default: "12345678" },
});

UserSchema.plugin(paginate);

UserSchema.pre("getOne", function () {
  this.populate(["carts.id"]);
  this.populate(["roles.id"]);
});

UserSchema.pre("findOne", function () {
  this.populate(["carts.id"]);
  this.populate(["roles.id"]);
});

export default mongoose.model(userCollection, UserSchema);