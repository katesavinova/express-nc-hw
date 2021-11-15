const path = require('path');
const productsDatabase = require("./base-managment");
const {readJsonFile, writeJsonFile} = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), 'database', 'products', 'cart.json');


const cartProducts = {

    async getAllFromCart() {
        return await readJsonFile(FILE_PATH) || [];
    },

    async add(product) {
        const products = await this.getAllFromCart();

        let findIndex = products.findIndex((thing) => thing.name.toLowerCase() === product.name.toLowerCase());
        if (findIndex === -1) {
            if (product.name.trim() && product.price && product.quantity) {
                products.push(product);
                await writeJsonFile(FILE_PATH, products);
                return product;
            } else {
                throw new Error("Empty fields.");
            }
        } else {
            product.action = "increase";
            await this.changeQuantity(product);
        }
    },

    async delete(product) {
        let content = await this.getAllFromCart();
        let findIndex = content.findIndex((thing) => thing.name.toLowerCase() === product.name.toLowerCase());
        if (findIndex !== -1) {
            content.splice(findIndex, 1);
            await writeJsonFile(FILE_PATH, content);
            return true;
        } else {
            throw new Error("This item is not in the cart.")
        }
    },

    async changeQuantity(product) {
        let cart = await this.getAllFromCart();
        let findIndex = cart.findIndex((thing) => thing.name.toLowerCase() === product.name.toLowerCase());
        if (findIndex !== -1) {
            const catalog = await productsDatabase.getAllFromCatalog();
            const ProductPrice = catalog.find((thing) => thing.name.toLowerCase() === product.name.toLowerCase()).price;
            if (product.action === "increase") {
                cart[findIndex].quantity += 1;
            } else if (product.action === "decrease") {
                if (cart[findIndex].quantity === 1) {
                    return await this.delete(product);
                } else {
                    cart[findIndex].quantity -= 1;
                }
            }
            cart[findIndex].price = cart[findIndex].quantity * ProductPrice;
            await writeJsonFile(FILE_PATH, cart);
            return {quantity: cart[findIndex].quantity, price: cart[findIndex].price};
        } else {
            throw new Error("This item is not in the cart.");
        }
    }
};

module.exports = cartProducts;