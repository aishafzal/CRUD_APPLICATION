const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name:'String',
    email: 'String',
    phone:'Number',
    image:'String'
})

const Product = new mongoose.model('user',ProductSchema);
module.exports = Product;