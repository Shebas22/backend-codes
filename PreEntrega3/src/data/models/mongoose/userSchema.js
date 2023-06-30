import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userCollection = "users";

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true },
  age: { type: Schema.Types.Number, required: true },
  carts: { type: Schema.Types.ObjectId, ref: "carts"},
  role: { type: Schema.Types.ObjectId, index: true, ref: "roles", default: '647faadb366c27517bb6b349'},
  isRoot: { type: Schema.Types.Boolean, default: false },
  password: { type: Schema.Types.String, required: true },
});

UserSchema.plugin(paginate);

UserSchema.pre("findOne", function () {
  this.populate(["carts"]);
  this.populate(["role"]);
});

// UserSchema.pre("find", function () {
//   this.populate(["carts"]);
//   this.populate(["role"]);
// });


export default mongoose.model(userCollection, UserSchema);