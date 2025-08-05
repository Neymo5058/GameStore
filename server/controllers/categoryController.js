import CategoryModel from "../models/categoryModel.js";

const CategoryController = {
  async create(req, res, next) {
    try {
      const category = await CategoryModel.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },
  async getItems(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;

      const [categories, totalItems] = await Promise.all([
        CategoryModel.find().skip(skip).limit(limit),
        CategoryModel.countDocuments(),
      ]);

      res.status(200).json({
        status: "success",
        data: { categories },
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          page,
          limit,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Cannot get categories." });
    }
  },
};
export default CategoryController;
