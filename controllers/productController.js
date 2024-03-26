const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const categoryWiseData = {};
        const products = await Product.find();
        products.forEach(product => {
            if (!categoryWiseData[product.category]) {
                categoryWiseData[product.category] = [];
            }
            // Calculate selling price based on purchase price and discount
            const purchasePrice = parseFloat(product.purchase_price);
            const discount = parseFloat(product.discount);
            const sellingPrice = purchasePrice - (purchasePrice * (discount / 100));
            let status = "";
            if (product.quantity != 0) {
                status = "In Stock"
            } else {
                status = "Out of Stock"
            }

            // Add selling price to the product object
            const productWithSellingPrice = { ...product.toObject(), sellingPrice, status };
            categoryWiseData[product.category].push(productWithSellingPrice);
        });
        res.json(categoryWiseData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createProduct = async (req, res) => {
    const { product_name, purchase_price, discount, quantity, category, subcategory, brand, image, summary, details } = req.body;
    try {
        const newProduct = new Product({ product_name, purchase_price, discount, quantity, category, subcategory, brand, image, summary, details });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getProduct = async (req, res) => {
    try {
        const user = await Product.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

exports.updateProduct = async (req, res) => {
    try {

        const updatedUser = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.json({ message: "product not found" });
        } else {
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deleteduser = await Product.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            res.json({ message: "Product not found" });
        } else {
            res.json({ message: "Product deleted successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}