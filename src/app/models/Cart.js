let cart = null;

module.exports = class Cart {
    static save(product) {

        if (cart === null) {
            cart = {
                products: [],
                totalPrice: 0,
                totalQty: 0,
                totalProduct : 0
            };
        }

        const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            exsitingProduct.quantity += 1;
        } else { //not exist
            product.quantity = 1;
            cart.products.push(product);
            cart.totalProduct ++
        }

        cart.totalPrice += product.unit_price;
        cart.totalQty++


    }

    static getCart() {
        return cart;
    }
    static updatePrice(productId, cart){
        let findProduct= cart.find(cart => cart._id == productId);
        return findProduct.unit_price * findProduct.quantity
    }
    static delete(productId, cart) {
        let finIndexOfProduct = cart.findIndex(cart => cart._id == productId);
        let findProduct = cart.find(cart => cart._id == productId);
        
        cart.splice(finIndexOfProduct , 1) 
        return findProduct.unit_price * findProduct.quantity
    }
    static updateQtyCart(productId, cart,valueQty){
        let findProduct= cart.find(cart => cart._id == productId);
        findProduct.quantity = valueQty;
        return findProduct.unit_price * findProduct.quantity
    }
}