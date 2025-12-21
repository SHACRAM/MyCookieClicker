import { Save } from "./Save.js";

export class Boost {
  shopId;
  image;
  name;
  actualQuantity;
  price;
  boostQuantity;
  personnalBoostValue;
  cookies;
  enableBuyButton;
  saveData;
  updateItemsList;

  boostElement = null;

  constructor(itemInfo) {
    this.updateCookiesScore = itemInfo.updateCookiesScore;
    this.image = itemInfo.image;
    this.shopId = itemInfo.shopId;
    this.name = itemInfo.name;
    this.price = itemInfo.price;
    this.cookies = itemInfo.cookies;
    this.enableBuyButton = itemInfo.enableBuyButton;
    this.boostQuantity = itemInfo.boostQuantity;
    this.saveData = itemInfo.saveData;
    this.updateItemsList = itemInfo.updateItemsList;
    this.actualQuantity = 0;
    this.personnalBoostValue = itemInfo.personnalBoostValue || 0.1;
    this.defineActualQuantity();
    this.calculatePrice();
    this.calculateBoost();
  }

  render() {
    const boostItemElement = document.createElement("div");
    boostItemElement.className = "boost-item";

    boostItemElement.innerHTML = `
        <div id='cardBoost'>
          <h3>${this.name}</h3>
          <div>
            <p class="itemQuantity">Quantity: ${this.actualQuantity}</p>
            <p class="itemPrice">Price: ${this.price} dollars</p>
            <p class="itemBoostQuantity">Boost: +${this.boostQuantity} dollars/sec</p>
          </div>
          <img src="./src/assets/${this.image}" alt="${this.name}" />
          <button class="buyButton">Buy</button>
        </div>
      `;

    this.boostElement = boostItemElement;

    let buyButton = boostItemElement.querySelector(".buyButton");

    buyButton.addEventListener("click", () => {
      this.updateBoostInfo();
      this.updateItemsList(this.name);
      this.saveData();
    }); 

    document.querySelector("#" + this.shopId).append(boostItemElement);
  }

  defineActualQuantity() {
    try {
      const save = new Save();
      const data = save.loadGame();
      const items = Array.isArray(data?.items) ? data.items : [];
      const match = items.find((item) => item && item.name === this.name);
      this.actualQuantity = match ? (parseInt(match.actualQuantity, 10) || 0) : 0;
    } catch (e) {
      this.actualQuantity = 0;
    }
  }

  calculatePrice() {
    this.price = this.price + this.actualQuantity * 3;
  }

  calculateBoost() {
    this.boostQuantity = (this.actualQuantity * this.personnalBoostValue).toFixed(1);
  }

  getActualQuantity() {
    return this.actualQuantity;
  }

  updateBoostInfo() {
    this.actualQuantity += 1;
    this.updateCookiesScore(this.price);
    this.calculatePrice();
    this.calculateBoost();
    this.renderInfo();
  }

  renderInfo() {
    if (!this.boostElement) return;
    this.boostElement.querySelector(
      ".itemQuantity"
    ).textContent = `Quantity: ${this.actualQuantity}`;
    this.boostElement.querySelector(
      ".itemPrice"
    ).textContent = `Price: ${this.price} dollars`;
    this.boostElement.querySelector(
      ".itemBoostQuantity"
    ).textContent = `Boost: +${this.boostQuantity} dollars/sec`;
  }
  updateBuyButtonState(status) {
    const buyButton = this.boostElement.querySelector(".buyButton");
    buyButton.disabled = status;
  }




}


