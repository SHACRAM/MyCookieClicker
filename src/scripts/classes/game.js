	
import { ClickableArea } from "../components/clickable-area";
import { Shop } from "./Shop";
import {Boost} from "./Boost";
	
 
	
export class Game {
	
  // Game Properties
	
  cookies = 0;
  passiveGain = 0;


 
	
  // Game Elements
	
  gameElement = null;
	
  scoreElement = null;
	
  shop = null;
	
 
	
  // Game Components
	
  clickableArea = null;
	
 
	
  constructor(config) {
	
    // Récupère le nombre de cookie de base via la configuration.
	
    this.cookies = config.cookies;
	
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
      updateCookiesScore : this.updateCookiesScore,
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
    
    setInterval(() =>{
      this.passiveGain =parseFloat(this.shop.getAllBoostsQuantity());
      let currentCookies = parseFloat(this.cookies);
      this.cookies = parseFloat(currentCookies + this.passiveGain);
      this.shop.updateChildButtonState(this.cookies);
      this.updateScore();
    },1000);
	
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
	
        <span>${this.cookies % 1 ===0 ? this.cookies : (this.cookies).toFixed(1)} cookies</span>
	
    `;
  }
	
 
  // Ici on utilise une fonction fléchée pour avoir encore accès au this de Game.
	
  // Sans fonction fléchée, le this serait celui de l'élément lié au click.
	
  onClickableAreaClick = () => {
	
    // On ajoute 1 point aux cookies pour chaque click.
	
    this.cookies += 1000;
    this.shop.updateChildButtonState(this.cookies);

    document.dispatchEvent(new Event("cookieClicked"));
	
    // Par soucis de performance car les changements au DOM sont très lourd,
	
    // On demande à la Window d'attendre la prochaine frame d'animation
	
    // pour réaliser les changements.
	
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
	
  };

// Methode pour mettre à jour la quantité de cookies aprés un achat dans le shop
  updateCookiesScore = (purchaseQuantity) => {
    this.cookies -= purchaseQuantity;
    this.updateScore();
    this.shop.updateChildButtonState(this.cookies);
  }

	
}