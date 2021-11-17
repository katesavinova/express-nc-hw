var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Cart = /** @class */ (function () {
    function Cart() {
        this.modalWindow = null;
    }
    Cart.prototype.getContainBasket = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/cart")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cart.prototype.renderCart = function () {
        return __awaiter(this, void 0, Promise, function () {
            var template, content, place, cartItem, data, e_1, modalClose;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        template = document.querySelector(".popUp-part").content;
                        content = document.importNode(template, true);
                        place = content.querySelector(".popup");
                        cartItem = content.querySelector(".popup-list");
                        place.innerHTML = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getContainBasket()];
                    case 2:
                        data = _a.sent();
                        data.map(function (product) {
                            var clonedCartItem = cartItem === null || cartItem === void 0 ? void 0 : cartItem.cloneNode(true);
                            clonedCartItem.querySelector(".popup-list-name").innerHTML = product.name;
                            clonedCartItem.querySelector(".modal-item__price").innerHTML = product.price.toString();
                            clonedCartItem.querySelector(".modal-item__button-increase")
                                .addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                var parent;
                                return __generator(this, function (_a) {
                                    try {
                                        parent = document.querySelector("[data-name=" + product.name + "]");
                                        parent.querySelector(".modal-item__price").innerText = result.price.toString();
                                        parent.querySelector(".modal-item__quantity").innerText = result.quantity.toString();
                                    }
                                    catch (response) {
                                        console.log(response);
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            clonedCartItem.querySelector(".modal-item__button-decrease")
                                .addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                var parent;
                                return __generator(this, function (_a) {
                                    try {
                                        parent = document.querySelector("[data-name=" + product.name + "]");
                                    }
                                    catch (response) {
                                        console.log(response);
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            clonedCartItem.setAttribute("data-name", product.name);
                            place === null || place === void 0 ? void 0 : place.appendChild(clonedCartItem);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        document.body.appendChild(content);
                        this.modalWindow = document.querySelector(".modal");
                        modalClose = document.querySelectorAll("[data-close]");
                        modalClose.forEach(function (close) {
                            close.addEventListener("click", function () {
                                _this.closeCart();
                            });
                        });
                        this.modalWindow.addEventListener("click", function (e) {
                            if (e.target === _this.modalWindow) {
                                _this.closeCart();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.closeCart = function () {
        this.modalWindow.remove();
    };
    return Cart;
}());
var cart = new Cart();
var Card = /** @class */ (function () {
    function Card(product) {
        var template = document.querySelector(".catalog__card-template").content;
        var content = document.importNode(template, true);
        var placeCard = document.querySelector(".merch__catalog");
        this.name = content.querySelector(".catalog__card-name");
        this.price = content.querySelector(".catalog__card-price");
        this.image = content.querySelector(".catalog__card-image");
        this.addButton = content.querySelector(".catalog__card-button");
        this.name.innerHTML = product.name;
        this.price.innerHTML = product.price;
        this.image.setAttribute("src", product.image);
        this.addButton.onclick = function () {
            return Card.addToBasket(product.name, +product.price);
        };
        placeCard.appendChild(content);
    }
    Card.addToBasket = function (name, price) {
        return __awaiter(this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            name: name,
                            price: price,
                            quantity: 1
                        };
                        return [4 /*yield*/, fetch("http://localhost:3000/cart", {
                                method: "POST", body: JSON.stringify(product), headers: {
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Card;
}());
function productsCardFromLocal() {
    return __awaiter(this, void 0, Promise, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
productsCardFromLocal().then(function (data) {
    data.map(function (_a) {
        var name = _a.name, price = _a.price, image = _a.image;
        new Card({ name: name, price: price, image: image });
    });
}).catch(function (error) { return console.log(error); });
var btnOpen = document.querySelector("[data-modal]");
function openWindow() {
    cart.renderCart().then(function () { return console.log("OK!"); });
}
btnOpen === null || btnOpen === void 0 ? void 0 : btnOpen.addEventListener("click", openWindow);
