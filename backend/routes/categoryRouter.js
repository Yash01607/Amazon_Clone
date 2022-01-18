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

export default router;