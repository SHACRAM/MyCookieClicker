export class Boost{
   shopId;
   name;
   actualQuantity;
   price;
   boostQuantity;

   boostElement = null;

     constructor(itemInfo){
         this.shopId = itemInfo.shopId;
         this.name = itemInfo.name;
         this.actualQuantity = itemInfo.actualQuantity;
         this.price = itemInfo.price;
         this.boostQuantity = itemInfo.boostQuantity;
     }

   render(){
      const boostItemElement = document.createElement("div");
      boostItemElement.className = "boost-item";

      boostItemElement.innerHTML = `
         <h3>${this.name}</h3>
         <p class="itemQuantity">Quantity: ${this.actualQuantity}</p>
         <p class="itemPrice">Price: ${this.price} cookies</p>
         <p class="itemBoostQuantity">Boost: +${this.boostQuantity} cookies/sec</p>
         <button class="buyButton">Buy</button>
      `;

      this.boostElement = boostItemElement;

      let buyButton = boostItemElement.querySelector('.buyButton');

      buyButton.addEventListener('click', ()=>{
         this.updateBoostInfo();
      })


      
      document.querySelector('#' + this.shopId).append(boostItemElement);

      
     }


   calculatePrice(){
      this.price = this.price+(this.actualQuantity*3);
   }

   calculateBoost(){
      this.boostQuantity = this.actualQuantity*0.1;
   }

   getActualQuantity(){
         return this.actualQuantity;
   }

   updateBoostInfo(){
      this.actualQuantity += 1;
      this.calculatePrice();
      this.calculateBoost();
      this.renderInfo();
   }

   renderInfo(){
   if (!this.boostElement) return;
   this.boostElement.querySelector('.itemQuantity').textContent = `Quantity: ${this.actualQuantity}`;
   this.boostElement.querySelector('.itemPrice').textContent = `Price: ${this.price} cookies`;
   this.boostElement.querySelector('.itemBoostQuantity').textContent = `Boost: +${this.boostQuantity} cookies/sec`;
}


}