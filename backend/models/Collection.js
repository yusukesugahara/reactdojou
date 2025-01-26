const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 問題集名
  description: { type: String }, // 問題集の説明
});

module.exports = mongoose.model('Collection', CollectionSchema);
