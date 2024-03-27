
const Cart = require('../models/cart');
const Customer = require('../models/customer');
const Product = require('../models/product');
const Delivery_address = require('../models/delivery_address')



exports.addcart = async (req, res) => {
    const email = req.user;
    const existUser = await Customer.findOne({ email: email });

    const user_id = existUser._id;
    const quantity = req.body.quantity;
    const size = req.body.size;
    const product_id = req.params.id;
    const product = await Product.findById(product_id);

    if (product.quantity > quantity) {
        let newquantity = product.quantity - quantity;
        req.body.quantity = newquantity;
        const updatedProduct = await Product.findByIdAndUpdate(product_id, req.body, { new: true });
        if (updatedProduct) {
            const newCart = new Cart({ product_id: product_id, user_id: user_id, quantity: quantity, size: size });
            const savedCart = await newCart.save();
            res.status(201).json(savedCart);
        }

    } else {
        res.json({ message: "product is out of stock" });
    }




}


exports.cart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        const productPromises = cartItems.map(async (element) => {
            const product = await Product.findById(element.product_id);
            const purchasePrice = parseFloat(product.purchase_price);
            const discount = parseFloat(product.discount);
            const sellingPrice = purchasePrice - (purchasePrice * (discount / 100));
            const total_price = sellingPrice * element.quantity;

            return { "product_image": product.image, "product_name": product.product_name, "price": sellingPrice, "quantity": element.quantity, "size": element.size, "total": total_price }

        });

        const products = await Promise.all(productPromises);
        res.json(products);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.checkout = async (req, res) => {
    const { first_name, last_name, delivery_address, city, state, country, zipcode, email, mobile_no, payment_status, address, } = req.body;
    const useremail = req.user;
    const existUser = await Customer.findOne({ email: useremail });
    // res.send(existUser);
    const user_id = existUser._id;
    try {
        const newAddress = new Delivery_address({ first_name, last_name, delivery_address, city, state, country, zipcode, email, mobile_no, payment_status, address, user_id: user_id });
        const savedProduct = await newAddress.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


