const express = require('express');
const bodyParser = require('body-parser');
const bucket = require("../firebaseAdmin");
const cors = require('./cors');

const Clothes = require('../models/clothes');
var authenticate = require('../authenticate');

const ClothesRouter = express.Router();

ClothesRouter.use(bodyParser.json());

ClothesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res, next) => {
    try {
        const cloth = await Clothes.find(req.query)
        .lean();
        res.status(200).json(cloth);
    } catch (error) {
        next(error);
    }
})
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
  const { category, items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No clothing item(s) provided." });
  }

  const clothingItem = {
    ...items[0],
    images: items[0].images || {}, // keep as plain object
    size: items[0].size || {}      // keep as plain object
  };
  
  console.log(clothingItem); 
  try {
    let categoryDoc = await Clothes.findOne({ category });

    if (categoryDoc) {
      categoryDoc.items.push(clothingItem);
      await categoryDoc.save();
    } else {
      categoryDoc = new Clothes({
        category,
        items: [clothingItem],
      });
      await categoryDoc.save();
    }

    res.status(200).json({ message: 'Clothing item added successfully', data: categoryDoc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ClothesRouter.route('/:category/:clothesId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, async (req, res, next) => {
    const { category, clothesId } = req.params;

    try {
        const categoryDoc = await Clothes.findOne({ category });

        if (!categoryDoc) {
            const err = new Error(`Category '${category}' not found`);
            err.status = 404;
            return next(err);
        }

        // Find the item in the items array
        const clothingItem = categoryDoc.items.id(clothesId);

        if (!clothingItem) {
            const err = new Error(`Clothing item with ID '${clothesId}' not found in category '${category}'`);
            err.status = 404;
            return next(err);
        }

        res.status(200).json(clothingItem);
    } catch (err) {
        next(err);
    }
})
.delete(cors.cors, authenticate.verifyUser, async (req, res, next) => {
    try {
      const { category, clothesId } = req.params;

      // Step 1: Find category document
      const categoryDoc = await Clothes.findOne({ category });
      if (!categoryDoc) {
        return res.status(404).json({ error: `Category ${category} not found` });
      }

      // Step 2: Find the specific item by ID
      const itemToRemove = categoryDoc.items.id(clothesId);
      if (!itemToRemove) {
        return res.status(404).json({ error: `Item ${clothesId} not found in category ${category}` });
      }
      console.log(`Deleting item: ${itemToRemove.name}`);
      // Step 3: Delete files from Firebase Storage
      const folderPrefix = `veloura_clothes/${itemToRemove.name}/`;

      // List all files with that prefix and delete
      const [files] = await bucket.getFiles({ prefix: folderPrefix });

      const deletePromises = files.map(file => file.delete());
      await Promise.all(deletePromises);

      console.log(`Deleted ${files.length} files from Firebase folder: ${folderPrefix}`);

      // Step 4: Remove the item and save
      itemToRemove.remove();
      await categoryDoc.save();

      res.status(200).json({ message: "Clothing item and associated images deleted successfully." });
    } catch (error) {
      console.error("Delete Error:", error);
      next(error);
    }
  }
);

ClothesRouter.route('/:category/:clothesId/newdiscount')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    const { category, clothesId } = req.params;
    const { newdiscount } = req.body;
    try {
      const categoryDoc = await Clothes.findOne({ category });
  
      if (!categoryDoc) {
        const err = new Error(`Category '${category}' not found`);
        err.status = 404;
        return next(err);
      }
  
      const itemToUpdate = categoryDoc.items.id(clothesId);
  
      if (!itemToUpdate) {
        const err = new Error(`Clothing item with ID '${clothesId}' not found in category '${category}'`);
        err.status = 404;
        return next(err);
      }
  
      itemToUpdate.discount = parseFloat(newdiscount); // set new discount
      await categoryDoc.save();
  
      res.status(200).json({ message: `Discount updated to ${newdiscount}%`, updatedItem: itemToUpdate });
    } catch (err) {
      next(err);
    }
});

ClothesRouter.route('/:category/:clothesId/best')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  const { category, clothesId } = req.params;

  try {
    const categoryDoc = await Clothes.findOne({ category });

    if (!categoryDoc) {
      const err = new Error(`Category '${category}' not found`);
      err.status = 404;
      return next(err);
    }

    const itemToUpdate = categoryDoc.items.id(clothesId);

    if (!itemToUpdate) {
      const err = new Error(`Clothing item with ID '${clothesId}' not found in category '${category}'`);
      err.status = 404;
      return next(err);
    }

    // Toggle the 'best' value
    itemToUpdate.best = !itemToUpdate.best;
    await categoryDoc.save();

    res.status(200).json({ 
      message: `Clothing item 'best' flag toggled to ${itemToUpdate.best}`, 
      updatedItem: itemToUpdate 
    });
  } catch (err) {
    next(err);
  }
});

ClothesRouter.route('/:category/:clothesId/addstock')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  const { category, clothesId } = req.params;
  const stockUpdates = req.body; // Example: { "S": 5, "L": 3 }

  try {
    const categoryDoc = await Clothes.findOne({ category });

    if (!categoryDoc) {
      const err = new Error(`Category '${category}' not found`);
      err.status = 404;
      return next(err);
    }

    const item = categoryDoc.items.id(clothesId);
/*     console.log(stockUpdates)
 */
    // Make sure sizes is a Map
    if (!(item.size instanceof Map)) {
      item.size = new Map(Object.entries(item.size || {}));
    }

    // Update stock
    Object.entries(stockUpdates.sizes).forEach(([sizeKey, addedQty]) => {
      const currentQty = item.size.get(sizeKey) || 0;
      item.size.set(sizeKey, currentQty + addedQty);
    });

    await categoryDoc.save();

    res.status(200).json({ message: 'Stock updated successfully', updatedItem: item });
  } catch (err) {
    next(err);
  }
});

module.exports = ClothesRouter;