import { TryCatch } from '../middlewares/error.js';
import { Product } from '../models/Product.js';
import { ErrorHandler } from '../utils/utility-class.js';
import { rm } from 'fs';
import { nodeCache } from '../app.js';
import { inValidateCache } from '../utils/features.js';
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new ErrorHandler('All Feilds are Required.', 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log('Deleted');
        });
        return next(new ErrorHandler('Please Add Photo.', 400));
    }
    const product = await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo?.path,
    });
    inValidateCache({
        product: true,
        admin: true
    });
    return res.status(201).json({
        success: true,
        message: 'Product Created Successfully.',
        product
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler('Invalid Product Id.', 404));
    if (photo) {
        rm(product.photo, () => {
            console.log('Old photo Deleted');
        });
        product.photo = photo.path;
    }
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (stock) {
        product.stock = stock;
    }
    if (category) {
        product.category = category;
    }
    await product.save();
    inValidateCache({
        product: true,
        productId: String(product.id),
        admin: true
    });
    return res.status(201).json({
        success: true,
        message: 'Product Updated Successfully.',
        product
    });
});
export const getLatestProduct = TryCatch(async (req, res, next) => {
    let products = [];
    if (nodeCache.has('latest-products')) {
        products = JSON.parse(nodeCache.get('latest-products'));
    }
    else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        // revalidate on New, update, Delete Product and on New Order(stock)
        nodeCache.set('latest-products', JSON.stringify(products));
    }
    return res.status(201).json({
        success: true,
        products,
    });
});
// revalidate  cache on New, update, Delete Product and on New Order(stock)
export const getCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (nodeCache.has('categories')) {
        categories = JSON.parse(nodeCache.get('categories'));
    }
    else {
        categories = await Product.distinct('category');
        // revalidate on New, update, Delete Product and on New Order(stock)
        nodeCache.set('categories', JSON.stringify(categories));
    }
    return res.status(201).json({
        success: true,
        categories,
    });
});
// revalidate  cache on New, update, Delete Product and on New Order(stock)
export const getAllProducts = TryCatch(async (req, res, next) => {
    let products;
    if (nodeCache.has('all-products')) {
        products = JSON.parse(nodeCache.get('all-products'));
    }
    else {
        products = await Product.find({});
        nodeCache.set('all-products', JSON.stringify(products));
    }
    return res.status(201).json({
        success: true,
        products,
    });
});
export const getProductDetail = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (nodeCache.has(`product-detail-${id}`)) {
        product = JSON.parse(nodeCache.get(`product-detail-${id}`));
    }
    else {
        product = await Product.findById(req.params.id);
        if (!product)
            return next(new ErrorHandler('Invalid Product Id.', 404));
        nodeCache.set(`product-detail-${id}`, JSON.stringify(product));
    }
    return res.status(201).json({
        success: true,
        product,
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler('Product Not Found.', 404));
    rm(product.photo, () => {
        console.log('Product Photo Deleted.');
    });
    await product.deleteOne();
    inValidateCache({
        product: true,
        productId: String(product.id),
        admin: true
    });
    return res.status(201).json({
        success: true,
        message: 'Product Deleted Successfully.',
    });
});
export const getAllProductsWithFilter = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = limit * (page - 1);
    const baseQuery = {};
    if (search) {
        baseQuery.name = {
            $regex: search,
            $options: 'i',
        };
    }
    if (price) {
        baseQuery.price = {
            $lte: Number(price),
        };
    }
    if (category)
        baseQuery.category = category;
    const [products, filteredOnlyProducts] = await Promise.all([
        Product.find(baseQuery)
            .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : undefined)
            .limit(limit)
            .skip(skip),
        Product.find(baseQuery),
    ]);
    const totalPage = Math.ceil(filteredOnlyProducts.length / limit);
    return res.status(201).json({
        success: true,
        products,
        totalPage,
    });
});
