import { ClickableArea } from "../components/clickable-area";
import { Shop } from "./Shop";
import { RandomCookie } from "./RandomSpawn.js";

export class Game {
  // Game Properties
  save;
  cookies;
  passiveGain;
  boostMultiplier;
  items;

  // Game Elements

  gameElement = null;

  scoreElement = null;

  shop = null;

  // Game Components

  clickableArea = null;

  constructor(config) {
    // Récupère le nombre de cookie de base via la configuration.
    this.cookies = config.cookies;
    this.passiveGain = config.passiveGain;
    this.boostMultiplier = config.boostMultiplier;
    this.items = config.items;
    this.save = config.save;


    // Récupère l'élément avec l'id game.

    this.gameElement = document.querySelector("#game");

    // Crée le composant ClickableArea qui gère la logique de la zone cliquable.

    // On passe en argument l'élément Game pour permettre l'ajout d'HTML à l'intérieur.

    // Et une fonction Callback pour réagir à l'événement de clique.

    this.clickableArea = new ClickableArea(
      this.gameElement,

      this.onClickableAreaClick
    );
    this.shop = new Shop({
      updateCookiesScore: this.updateCookiesScore,
      items: this.items,
      saveData: this.saveData.bind(this),
      save: this.save,
      updateItemsList: this.updateItemsList.bind(this)
    });
  }

  // Lance le jeu

  start() {
    this.render();
  }

  // Génère les éléments à afficher.

  render() {

    this.renderScore();

    this.clickableArea.render();

    this.shop.render();
    this.shop.updateChildButtonState(this.cookies);

    setInterval(() => {
      let basePassiveGain = parseFloat(this.shop.getAllBoostsQuantity());
      this.passiveGain = basePassiveGain * this.boostMultiplier;
      let currentCookies = parseFloat(this.cookies);
      this.cookies = parseFloat(currentCookies + this.passiveGain);
      this.shop.updateChildButtonState(this.cookies);
      this.updateScore();
    }, 1000);

    setInterval(() => {
      const randomCookie = new RandomCookie({
        top: Math.random() * 100,
        left: Math.random() * 100,
        right: Math.random() * 100,
        bottom: Math.random() * 100,
        goldenCookieBoost: this.goldenCookieBoost.bind(this)
      });
      document.querySelector("#game").append(randomCookie.render());
    }, 50000);

    setInterval(() => {
      this.saveData();
    }, 1000);
  }

  // Génère l'affichage du score.

  renderScore() {
    this.scoreElement = document.createElement("section");

    this.scoreElement.id = "game-score";

    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  // Met à jour l'affichage du score.

  updateScore() {
    this.scoreElement.innerHTML = `
	
        <span>${
          this.cookies % 1 === 0 ? this.cookies : this.cookies.toFixed(1)
        } dollars</span>
	
    `;
  }


  onClickableAreaClick = () => {
    // On ajoute 1 point aux cookies pour chaque click.

    this.cookies += 1;
    this.shop.updateChildButtonState(this.cookies);

    document.dispatchEvent(new Event("cookieClicked"));

    // Par soucis de performance car les changements au DOM sont très lourd,

    // On demande à la Window d'attendre la prochaine frame d'animation

    // pour réaliser les changements.

    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  // Methode pour mettre à jour la quantité de cookies après un achat dans le shop
  updateCookiesScore = (purchaseQuantity) => {
    this.cookies -= purchaseQuantity;
    this.updateScore();
    this.shop.updateChildButtonState(this.cookies);
  };
//Méthode pour ajouter le boost d'un golden cookie
  goldenCookieBoost(){
    let tempMultiplier = this.boostMultiplier;
    this.boostMultiplier *=1000;

    setTimeout(()=>{
      this.boostMultiplier = tempMultiplier;
    }, 5000);
  }


  //methode pour sauvegarder la partie dans le local storage
  saveData(){
    this.save.saveGame(
      this.boostMultiplier,
      this.passiveGain,
      this.cookies,
      this.items
    )

  }

  //methode pour mettre à jour la liste des items
  updateItemsList(name){
    const itemInTable = this.items.find(item => item.name === name);
    if (itemInTable) {
        itemInTable.actualQuantity += 1;
    } else {
        this.items.push({
            name: name,
            actualQuantity: 1
        });
    }
  }
      
  

}
