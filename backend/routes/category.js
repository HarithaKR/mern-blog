const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({message: "Category not found"});
    }
    res.status(200).json(category);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category({
      ...req.body
    });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const catToUpdate = await Category.findByIdAndUpdate(req.params.id, {
      ...req.body
    }, {new: true});
    if (catToUpdate) {
      res.status(200).json(catToUpdate);
    } else {
      res.status(404).json({message: "Category not found"});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const catToDelete = await Category.findByIdAndDelete(req.params.id);
    if (catToDelete) {
      res.status(204).json({message: "Category Deleted"});
    } else {
      res.status(404).json({message: "Category not found"});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;