const models = require('../../models');
const moment = require('moment')

exports.createBlog = async (req, res) => {
  const { title, body, image } = req.body;
  await models.Blog.create({ userId: req.userData.id, title, body, image });
  return res.status(200).json({ message: 'Blog created' });
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await models.Blog.find({}).sort({ updatedAt: -1 });
  return res.status(200).json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await models.Blog.findById(req.params.id);
  return res.status(200).json(blog);
};

exports.getBlogsByUserId = async (req, res) => {
  const blogs = await models.Blog.find({ userId: req.userData.id }).sort({ updatedAt: -1 });
  return res.status(200).json(blogs);
};

exports.updateBlogById = async (req, res) => {
  const { title, image, body } = req.body;
  await models.Blog.findOneAndUpdate(
    { _id: req.params.id },
    { title, image, body, updatedAt: moment.utc() }
  );
  return res.status(200).json({ message: 'Blog updated' });
};

exports.deleteBlogById = async (req, res) => {
  await models.Blog.findOneAndRemove({ _id: req.params.id });
  return res.status(200).json({ message: 'Blog deleted' });
};
