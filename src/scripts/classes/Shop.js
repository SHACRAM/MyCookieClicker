import { Boost } from "./Boost";

export class Shop{
    id = 'shop'
    cookies;
    enableBuyButton;

    shopElement = null;

    boostItems = [];
    updateCookiesScore = null;


    constructor(config){
        this.updateCookiesScore = config.updateCookiesScore;
        this.cookies = config.cookies;
        this.enableBuyButton = config.enableBuyButton;
    }


    render(){
        this.shopElement = document.createElement("section");
        this.shopElement.id = this.id;

        this.shopElement.innerHTML = `
            <h2>Shop</h2>
        `;

        document.querySelector("#game").append(this.shopElement);
        this.createBoostItems();
        this.boostItems.forEach((item)=>{
            item.render();
        })
    }

    createBoostItems(){
        const cursor = new Boost({
            updateCookiesScore : this.updateCookiesScore,
            shopId : this.id,
            name : "Cursor",
            actualQuantity : 0,
            price : 10,
            boostQuantity : 0,
            cookies: this.cookies,
            enableBuyButton: this.enableBuyButton

        });
        this.boostItems.push(cursor);
    
        const grandma = new Boost({
            updateCookiesScore : this.updateCookiesScore,
            shopId : this.id,
            name : "Grandma",
            actualQuantity : 0,
            price : 100,
            boostQuantity : 0,
            cookies: this.cookies,
            enableBuyButton: this.enableBuyButton

        });
        this.boostItems.push(grandma);
    }

    updateChildButtonState(cookies){
        this.boostItems.forEach((item)=>{
            if(cookies >= item.price){
                item.updateBuyButtonState(false)
            }else{
                item.updateBuyButtonState(true)
            }
        })
    }
}