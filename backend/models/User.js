const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    avatar:   { type: String, default: '' },
    myList:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    watchHistory: [
      {
        content:   { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
        progress:  { type: Number, default: 0 },   // seconds watched
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    plan: { type: String, enum: ['free', 'standard', 'premium'], default: 'free' },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password helper
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
