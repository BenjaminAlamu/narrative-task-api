const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    $and: [{ email, _id: { $ne: excludeUserId } }, { email: { $ne: null } }],
  });
  return !!user;
};


userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
module.exports = User;
