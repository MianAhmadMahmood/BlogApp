import blogModel from "../model/blogmodel.js";

class BlogController {
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await blogModel.find({ user: req.user._id });
      return res.status(200).json(fetchAllBlogs);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static addNewBlog = async (req, res) => {
    const { title, category, description } = req.body;
    try {
      if (title && category && description) {
        const addBlog = new blogModel({
          title: title,
          description: description,
          category: category,
          thumbnail: req.file.filename,
          user: req.user._id,
        });

        const savedBlog = await addBlog.save();
        if (savedBlog) {
          return res.status(200).json({ message: "Blog Added successfully" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getSingleBlog = async (req, res) => {
    const { id } = req.params; 
    try {
      if (id) {
        const fetchBlogByID = await blogModel.findById(id); 
        if (fetchBlogByID) {
          return res.status(200).json({ blog: fetchBlogByID }); 
        } else {
          return res.status(404).json({ message: "Blog not found" });
        }
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default BlogController;
