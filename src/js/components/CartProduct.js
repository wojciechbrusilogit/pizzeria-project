import { select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
    constructor(menuProduct, element) {
        const thisCartProduct = this;
        thisCartProduct.id = menuProduct.id;
        thisCartProduct.amount = menuProduct.amount;
        thisCartProduct.name = menuProduct.name;
        thisCartProduct.params = menuProduct.params;
        thisCartProduct.price = menuProduct.price;
        thisCartProduct.priceSingle = menuProduct.priceSingle;
        thisCartProduct.getElements(element);
        thisCartProduct.initAmountWidget();
        thisCartProduct.initActions();
    }

    getElements(element) {
        const thisCartProduct = this;
        thisCartProduct.dom = {
            amountWidget: element.querySelector(select.cartProduct.amountWidget),
            price: element.querySelector(select.cartProduct.price),
            edit: element.querySelector(select.cartProduct.edit),
            remove: element.querySelector(select.cartProduct.remove),
        };
        thisCartProduct.dom.wrapper = element;
    }

    initAmountWidget() {
        const thisCartProduct = this;
        thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget, thisCartProduct.amount);
        thisCartProduct.dom.amountWidget.addEventListener('updated', function () {
            thisCartProduct.amount = thisCartProduct.amountWidget.value;
            thisCartProduct.newPrice = thisCartProduct.priceSingle * thisCartProduct.amount;
            thisCartProduct.dom.price.innerHTML = thisCartProduct.newPrice;
        });
    }

    remove() {
        const thisCartProduct = this;
        const event = new CustomEvent('remove', {
            bubbles: true,
            detail: {
                CartProduct: thisCartProduct,
            },
        });
        thisCartProduct.dom.wrapper.dispatchEvent(event);
    }

    initActions() {
        const thisCartProduct = this;
        thisCartProduct.dom.edit.addEventListener('click', function (event) {
            event.preventDefault();
        });
        thisCartProduct.dom.remove.addEventListener('click', function (event) {
            event.preventDefault();
            thisCartProduct.remove();
        });
    }



    getData() {
        const thisCartProduct = this;

        const getDataProducts = {
            id: thisCartProduct.id,
            amount: thisCartProduct.amount,
            price: thisCartProduct.price,
            priceSingle: thisCartProduct.priceSingle,
            name: thisCartProduct.name,
            params: thisCartProduct.params
        };
        return getDataProducts;
    }
}

export default CartProduct;