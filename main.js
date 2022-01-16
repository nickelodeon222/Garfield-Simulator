//@ts-check

// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    Game.lasangaAmount++;
    lasangaCounter.innerHTML = `YOU HAVE ${Math.floor(Game.lasangaAmount)} LASANGA`;
});

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener("click", () => {
    try {
        Game.save();
        alert('saved!!!');
    }
    catch (err) {
        alert('save no work');
    }
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener("click", () => {
    if (window.confirm('are you sure you want to delete it?')) {
        Game.deleteSave();
        location.reload();
    }
});

// Increases your bananas by your BPS every second
const loop = setInterval(() => {
    // Displays your bps
    let lps = 0;
    Game.allItems.forEach(item => {
        lps += item.profit();
        if (Game.lasangaAmount >= item.cost / 2 && item.button.hidden) {
            item.button.hidden = false;
        } 
    })
    
    const lpsCounter = document.getElementById('lpsCounter');
    lpsCounter.innerHTML = `${lps} lasanga per second`;

    Game.lasangaAmount += lps;

    // if your bps doesn't equal zero, the minion eats the bananas, and the beps is shown
    if (lps !== 0) {
        const lasangaEatenPerSecond = lps / 3 * Game.lepsMultiplier;
        Game.lepsMultiplier *= 1.001;
        Game.lasangaAmount -= lasangaEatenPerSecond;
        Game.eatenLasanga += lasangaEatenPerSecond;

        const lasangaEatenCounter = document.getElementById('eatenLasangaCount');
        lasangaEatenCounter.innerHTML = `GARFIELD HAS EATEN ${Math.floor(Game.eatenLasanga)} LASANGA`;

        const lepsCounter = document.getElementById('lepsCount');
        lepsCounter.innerHTML = `GARFIELD EATS ${(lasangaEatenPerSecond).toFixed(2)} OF YOUR LASANGA PER SECOND`
    }

    lasangaCounter.innerHTML = `YOU HAVE ${Math.floor(Game.lasangaAmount)} LASANGA`;

    if (Game.lasangaAmount < 0) {
        alert('GARFIELD ATE ALL THE LASANGA');
        clearInterval(loop);
        Game.lasangaAmount = 0;   
    }

}, 1000);
