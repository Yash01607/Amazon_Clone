import express from "express";
import Category from "../models/categoryModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.send(categories);
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  });

  const newCategory = await category.save();
  if (newCategory) {
    return res
      .status(201)
      .send({ msg: "New Category Created", data: newCategory });
  } else {
    return res.status(500).send({ msg: "error in Creating Category" });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  // console.log("req");
  const deletedCategory = await Category.findById(req.params.id);
  if (deletedCategory) {
    await deletedCategory.remove();
    res.send({ msg: "Category Deleted" });
  } else {
    res.send("Error in Deleting Category");
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  if (category) {
    category.name = req.body.name;
    category.image = req.body.image;
    category.description = req.body.description;

    const updatedCategory = await category.save();
    if (updatedCategory) {
      return res
        .status(200)
        .send({ msg: "Category Updated", data: updatedCategory });
    }
    return res.status(500).send({ msg: "Error in Updating Category" });
  }
  return res.status(500).send({ msg: "Error in Updating Category" });
});

export default router;
