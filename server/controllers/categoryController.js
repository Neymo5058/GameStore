import CategoryModel from "../models/CategoryModel.js";

const CategoryController = {
  async create(req, res) {
    try {
      console.log(req.body);
      const category = await CategoryModel.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
export default CategoryController;
