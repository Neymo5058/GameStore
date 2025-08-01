import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A category must have a name"],
    unique: true,
    trim: true,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
