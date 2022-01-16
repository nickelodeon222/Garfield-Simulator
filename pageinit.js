//@ts-check

const Game = {};

const lasangaCounter = document.getElementById("lasangaCount");
const feedButton = document.getElementById("feedGarfield");

Game.lasangaAmount = 0;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device)
    document.querySelector(".mainDiv").className = "classlessDiv";
}

/**
 * Class that represents an item in the game
 */
Game.GameItem = class {
    amount = 0;

    /**
     * The amount of bananas you will have after each second with this item
     */
    profit() {
        return this.amount * this.lasangaPerSecond;
    }

    /**
     * Creates a new item
     * @param {number} baseCost The base price of your item 
     * @param {string} name The name of your item 
     * @param {number} lps The bananas per second one of this item makes
     * @param {HTMLElement} button The button that displays the cost and amount of your item
     */
    constructor(baseCost, name, lps, button) {
        this.cost = baseCost;
        this.name = name;
        this.lasangaPerSecond = lps;
        this.button = button
        this.baseCost = baseCost;

        this.button.addEventListener('click', () => {
            if (Game.lasangaAmount >= this.cost) {
                Game.lasangaAmount -= this.cost;
                this.increase();
                Game.lepsMultiplier = 1.01;
            }
        });
    }
    
    /**
     * Increases the amount of items and the cost (DOESN'T DECREASE YOUR AMOUNT OF BANANAS)
     */
    increase() {
        this.amount++;
        for (let i = 0; i < this.amount; i++) {
            this.cost = this.baseCost + (this.cost / 10);
        }
        this.button.innerHTML = `${this.name}, cost: ${this.cost.toFixed(2)} lasanga, amount: ${this.amount}, lps: ${this.lasangaPerSecond}`;
    }
}

    
// Creates an item called the banana tree with 0.5 bps
Game.lasangaTree = new Game.GameItem(10, "lasanga tree", 0.5, document.getElementById('lasangaTreeButton'));

// Creates an item called the banana farm with 2 bps
Game.lasangaFarm = new Game.GameItem(100, "lasanga farm", 2, document.getElementById('lasangaFarmButton'));

Game.importedlasanga = new Game.GameItem(500, "import lasanga", 5, document.getElementById('importButton'));

Game.odieLabour = new Game.GameItem(1000, "odie labour", 10, document.getElementById("labourButton"));

Game.jonLabour = new Game.GameItem(5000, "jon labour", 50, document.getElementById('jonButton'));

Game.killNermal = new Game.GameItem(10000, 'kill nermal', 100, document.getElementById('nermalButton'));

Game.balls = new Game.GameItem(50000, 'balls', 500, document.getElementById('ballsButton'));

Game.eatenLasanga = 0;
Game.lepsMultiplier = 1.01;

Game.allItems = [Game.lasangaTree, Game.lasangaFarm, Game.importedlasanga, Game.odieLabour, Game.jonLabour, Game.killNermal, Game.balls];

// code for saving and cookies
function setCookie(cname, cvalue)  {
    document.cookie = cname + "=" + cvalue + "; SameSite=strict; path=/";
}
  
Game.save = () => {
    setCookie('lasanga', Game.lasangaAmount);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, item.amount);
    })
    setCookie('eatenlasanga', Game.eatenLasanga);
    setCookie('multiplier', Game.lepsMultiplier);
}

Game.deleteSave = () => {
    setCookie('bananas', 0);
    Game.allItems.forEach(item => {
        setCookie(`${item.name}Amount`, 0);
        setCookie(`${item.name}Price`, item.baseCost);
    })
    setCookie('eatenBananas', 0);
    setCookie('multiplier', 1.01);
}

Game.load = () => {
    Game.lasangaAmount = parseFloat(getCookie('lasanga'));
    Game.eatenLasanga = parseFloat(getCookie('eatenlasanga'));
    Game.lepsMultiplier = parseFloat(getCookie('multiplier'));
    // @ts-ignore
    Game.allItems.forEach(item => {
        item.amount = parseInt(getCookie(`${item.name}Amount`));
        for (let i = 0; i < item.amount; i++) {
            item.cost = item.baseCost + (item.cost / 10);
        }

        item.button.innerHTML = `${item.name}, amount: ${item.amount}, cost: ${item.cost} lasanga, bps: ${item.lasangaPerSecond}`;
    })
    
}

/**
 * @param {string} cname
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return "";
}

if (document.cookie) {
    Game.load();
}