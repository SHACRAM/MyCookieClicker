export class Save{
    
    constructor(){
    }

    saveGame(boostMultiplier, passiveGain, cookies, items){
        const saveData = JSON.stringify({
            boostMultiplier,
            passiveGain,
            cookies,
            items
    });
        localStorage.setItem("save", saveData);
    }

    loadGame(){
        const saveData = localStorage.getItem("save");
        if (saveData){
            const parsedData = JSON.parse(saveData);
           return {
                boostMultiplier: parsedData.boostMultiplier,
                passiveGain: parsedData.passiveGain,
                cookies: parsedData.cookies,
                items: parsedData.items
           }
        } else {
           return {
            boostMultiplier: 1,
            passiveGain: 0,
            cookies: 0,
            items: []
           }
        }
    }






}