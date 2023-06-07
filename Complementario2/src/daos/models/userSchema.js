import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import roleSchema from "./roleSchema.js";

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

// UserSchema.pre('create', async (next) => {
//   console.log("entra al pre");
//   if(this.role.length === 0){
//     const roleSchema = new roleSchema()
//     const roleDocument = await roleSchema.findOne({ name: 'guest' });
//     this.role.push(new mongoose.Types.ObjectId(roleDocument?._id));
//   }
//   next();
// });

export default mongoose.model(userCollection, UserSchema);