import Category from "../models/categoryModel.js";
import router from "../routes/userRoutes.js";

const postCategory = async(req, res) => {
    const newCategory = new Category(req.body);
    try{
        const savedCategory = await newCategory.save();
        res.status(201).json(
            req.body);
    } catch(error){
        res.status(500).json(error);
    }
};

const getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch(error){
        res.status(500).json({error});
    }
;}
export { postCategory, getCategories };