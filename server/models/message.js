const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  theme: { type: String },
  createdAt: { type: Date, required: true, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
