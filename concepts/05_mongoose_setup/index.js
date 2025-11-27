import express from 'express';
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(express.json());

mongoose.connect(MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        unique: true,
        required: true
    }
});



const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    inStock: { type: Boolean, default: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: Number,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('users', userSchema);
const Product = mongoose.model('products', productSchema);
const Order = mongoose.model('orders', orderSchema);

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
    }
});

app.post('/products', async (req, res) => {
    try {
        const { name, price, category } = req.body;
        
        // METHOD 1: Model.create() - One step creation and save
        // - Creates AND saves to database immediately
        // - Returns the saved document with _id
        // - Less memory usage, more direct
        const product = await Product.create({ name, price, category });
        
        // METHOD 2: new Model() + save() - Two step process
        // - Creates document in memory first, then saves to database
        // - More control: can modify before saving
        // - Useful when you need to hash passwords, add timestamps, etc.
        // const product = new Product({ name, price, category });
        // product.someField = 'modified value'; // Can modify before saving
        // await product.save();
        
        // Both methods end up with same result - a saved document in MongoDB
        res.json(product);

    } catch (error) {
        console.log(error);
    }
});

app.get('/order/:id', async (req, res) => {
    try {
        const users = await Order.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});



app.listen(4000, () => {
    console.log('Server running on port 4000');
});


