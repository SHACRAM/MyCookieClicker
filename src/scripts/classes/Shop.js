import { Boost } from "./Boost";

export class Shop {
  id;
  shopElement;
  boostItems;
  updateCookiesScore;

  constructor({ updateCookiesScore }) {
    this.id = "shop";
    this.shopElement = null;
    this.boostItems = [];
    this.updateCookiesScore = updateCookiesScore;
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = this.id;

    this.shopElement.innerHTML = `
            <h2>Shop</h2>
        `;

    document.querySelector("#game").append(this.shopElement);
    this.createBoostItems();
    this.boostItems.forEach((item) => {
      item.render();
    });
  }

  createBoostItems() {
    const cursor = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: this.id,
      name: "Cursor",
      actualQuantity: 0,
      price: 10,
      boostQuantity: 0,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
    });
    this.boostItems.push(cursor);

    const grandma = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: this.id,
      name: "Grandma",
      actualQuantity: 0,
      price: 100,
      boostQuantity: 0,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
    });
    this.boostItems.push(grandma);
  }

  updateChildButtonState(cookies) {
    this.boostItems.forEach((item) => {
      if (cookies >= item.price) {
        item.updateBuyButtonState(false);
      } else {
        item.updateBuyButtonState(true);
      }
    });
  }

  getAllBoostsQuantity() {
    let totalBoost = 0;
    this.boostItems.forEach((item) => {
      totalBoost = totalBoost + parseFloat(item.boostQuantity);
    });
    return totalBoost;
  }
}
