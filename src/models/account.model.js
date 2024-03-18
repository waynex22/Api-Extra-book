const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const objectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
  _id: { type: objectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
}, {
  versionKey: false,
  timestamps: true
});

accountSchema.pre('save', function (next) {
  const account = this;
  if (!account.isModified('password')) return next();
  bcrypt.hash(account.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    account.password = hashedPassword;
    next();
  });
});

const Account = mongoose.model('accounts', accountSchema);
module.exports = Account;
