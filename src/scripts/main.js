import "../styles/style.css";

import { Game } from "./classes/game";
import { Save } from "./classes/Save";

document.querySelector("#app").innerHTML = `
	
    <h1 id='title'>Welcome to my dollars maker!</h1>
	
    <main id="game">
	
    </main>
	
`;

const save = new Save()
const savedData= save.loadGame();


const game = new Game({
  ...savedData,
  save: save
});

game.start();
