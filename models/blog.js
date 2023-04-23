const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: true }
  },
  { collection: 'blog', timestamps: true }
);

module.exports = model('Blog', blogSchema);
