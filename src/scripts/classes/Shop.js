import { Boost } from "./Boost";

export class Shop {
  id;
  shopElement;
  boostItems;
  updateCookiesScore;
  saveData;
  save;
  updateItemsList;
  items;


  constructor({ updateCookiesScore, items, saveData, save, updateItemsList }) {
    this.id = "shop";
    this.shopElement = null;
    this.boostItems = [];
    this.updateCookiesScore = updateCookiesScore;
    this.saveData = saveData;
    this.save = save;
    this.updateItemsList = updateItemsList;
    this.items = items;
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = this.id;

    this.shopElement.innerHTML = `
            <h2>Shop</h2>
          <div id="boost-item-container">
            </div>
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
      shopId: "boost-item-container",
      name: "Cursor",
      actualQuantity: 0,
      price: 10,
      boostQuantity: 0,
      personnalBoostValue: 0.1,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "Cursor.svg"
    });
    this.boostItems.push(cursor);
    

    const software = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: "boost-item-container",
      name: "Software",
      actualQuantity: 0,
      price: 100,
      boostQuantity: 0,
      personnalBoostValue: 0.3,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "exe.webp"


    });
    this.boostItems.push(software);

    const update = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: "boost-item-container",
      name: "Update",
      actualQuantity: 0,
      price: 200,
      boostQuantity: 0,
      personnalBoostValue: 0.5,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "update 1.png"


    });
    this.boostItems.push(update);

    const diskSpace = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: "boost-item-container",
      name: "Disk space",
      actualQuantity: 0,
      price: 300,
      boostQuantity: 0,
      personnalBoostValue: 0.8,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "disk.png"


    });
    this.boostItems.push(diskSpace);

    const internet = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: "boost-item-container",
      name: "Internet speed",
      actualQuantity: 0,
      price: 500,
      boostQuantity: 0,
      personnalBoostValue: 1,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "internet.png"


    });
    this.boostItems.push(internet);

    const ram = new Boost({
      updateCookiesScore: this.updateCookiesScore,
      shopId: "boost-item-container",
      name: "Random access memory",
      actualQuantity: 0,
      price: 10000,
      boostQuantity: 0,
      personnalBoostValue: 1,
      cookies: this.cookies,
      enableBuyButton: this.enableBuyButton,
      saveData: this.saveData,
      updateItemsList: this.updateItemsList,
      save: this.save,
      image : "ram.jpg"


    });
    this.boostItems.push(ram);

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
