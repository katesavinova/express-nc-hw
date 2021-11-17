interface Product {
    name: string;
    price: string;
    image: string;
}

interface CardProduct {
    name: string;
    price: number;
}

interface ChangeCart {
    price: number;
}


class Cart {
    private modalWindow: HTMLDivElement | null;

    constructor() {
        this.modalWindow = null;
    }

    public async getContainBasket(): Promise<CardProduct[]> {
        const response: Response = await fetch("http://localhost:3000/cart");
        return await response.json();
    }

    public async renderCart(): Promise<void> {
        const template: DocumentFragment = (document.querySelector(".popUp-part") as HTMLTemplateElement).content;
        const content: DocumentFragment = document.importNode(template, true);
        const place: HTMLDivElement | null = content.querySelector(".popup");
        const cartItem: HTMLDivElement | null = content.querySelector(".popup-list");

        (place as HTMLDivElement).innerHTML = "";

        try {
            const data = await this.getContainBasket();
            data.map((product) => {

                let clonedCartItem = <HTMLDivElement>cartItem?.cloneNode(true);
                (clonedCartItem.querySelector(".popup-list-name") as Element).innerHTML = product.name;

                (clonedCartItem.querySelector(".modal-item__price") as HTMLParagraphElement).innerHTML = product.price.toString();

                (clonedCartItem.querySelector(".modal-item__button-increase") as HTMLButtonElement)
                    .addEventListener("click", async () => {
                        try {
                            const parent: Element | null = document.querySelector(`[data-name=${product.name}]`);
                            ((parent as HTMLDivElement).querySelector(".modal-item__price") as HTMLDivElement).innerText = (result as ChangeCart).price.toString();
                            ((parent as HTMLDivElement).querySelector(".modal-item__quantity") as HTMLDivElement).innerText = (result as ChangeCart).quantity.toString();
                        } catch (response) {
                            console.log(response);
                        }
                    });

                (clonedCartItem.querySelector(".modal-item__button-decrease") as HTMLButtonElement)
                    .addEventListener("click", async () => {
                        try {
                            const parent: Element | null = document.querySelector(`[data-name=${product.name}]`);
                            } catch (response) {
                            console.log(response);
                        }
                    })

                clonedCartItem.setAttribute("data-name", product.name);

                place?.appendChild(clonedCartItem);
            })

        } catch (e) {
            console.log(e);
        }
        document.body.appendChild(content);

        this.modalWindow = document.querySelector(".modal");
        const modalClose: NodeList = document.querySelectorAll("[data-close]");

        modalClose.forEach((close) => {
            close.addEventListener("click", () => {
                this.closeCart();
            });
        });

        (this.modalWindow as HTMLDivElement).addEventListener("click", (e: MouseEvent) => {
                if (e.target === this.modalWindow) {
                    this.closeCart();
                }
            }
        );
    }

    private closeCart(): void {
        (this.modalWindow as HTMLDivElement).remove();
    }
}

const cart = new Cart();

class Card {
    private name: HTMLParagraphElement | null;
    private price: HTMLSpanElement | null;
    private image: HTMLImageElement | null;
    private addButton: HTMLButtonElement | null;

    constructor(product: Product) {
        const template: DocumentFragment = (document.querySelector(
            ".catalog__card-template"
        ) as HTMLTemplateElement).content;
        const content: DocumentFragment = document.importNode(template, true);
        const placeCard: HTMLDivElement | null = document.querySelector(
            ".merch__catalog"
        );

        this.name = content.querySelector(".catalog__card-name");
        this.price = content.querySelector(".catalog__card-price");
        this.image = content.querySelector(".catalog__card-image");
        this.addButton = content.querySelector(".catalog__card-button");

        (this.name as HTMLParagraphElement).innerHTML = product.name;
        (this.price as HTMLSpanElement).innerHTML = product.price;
        (this.image as HTMLImageElement).setAttribute("src", product.image);

        (this.addButton as HTMLButtonElement).onclick = () =>
            Card.addToBasket(product.name, +product.price);

        (placeCard as HTMLDivElement).appendChild(content);
    }

    private static async addToBasket(name: string, price: number): Promise<void> {
        let product = {
            name: name,
            price: price,
            quantity: 1
        };
        await fetch("http://localhost:3000/cart", {
            method: "POST", body: JSON.stringify(product), headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

async function productsCardFromLocal() : Promise<Product[]>{
    const response: Response = await fetch("http://localhost:3000/");
    return await response.json();
}

productsCardFromLocal().then((data) => {
    data.map(({name, price, image}) => {
        new Card({name, price, image})
    })
}).catch((error) => console.log(error));

const btnOpen: HTMLElement | null = document.querySelector("[data-modal]");

function openWindow(): void {
    cart.renderCart().then(() => console.log("OK!"));
}

btnOpen?.addEventListener("click", openWindow);
