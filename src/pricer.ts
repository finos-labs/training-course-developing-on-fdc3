import { fdc3Ready } from "@finos/fdc3";

enum Direction { UP, DOWN, NONE }

type Price = {
    ticker: string,
    price: number,
    direction: Direction
}

const prices : Price[] = [{ ticker: "TSLA", price: 44.0, direction: Direction.NONE }];

var onScreenPrice : Price = prices[0]

function redraw() {
    const box = document.getElementById("price")!!

    while (box.lastElementChild) {
        box.removeChild(box.lastElementChild);
    }    

    const ticker = document.createElement("div");
    ticker.classList.add("ticker")
    ticker.textContent = onScreenPrice.ticker;
    box.classList.remove("d0")
    box.classList.remove("d1")
    box.classList.remove("d2")
    box.classList.add("d"+onScreenPrice.direction.toString());
    box.appendChild(ticker);

    const price = document.createElement("div")
    price.classList.add("price")
    price.textContent = onScreenPrice.price.toFixed(2);
    box.appendChild(price);
}

function recalculate() {
    prices.forEach(p => {
        const oldPrice = p.price;
        const oldPriceStr = (Math.round(oldPrice * 100) / 100).toFixed(2);
        const change = 0.01 * (0.5 - Math.random());
        const newPrice = oldPrice + change;
        const newPriceStr = (Math.round(newPrice * 100) / 100).toFixed(2);
        
        const direction = (newPriceStr == oldPriceStr) ? Direction.NONE : (change > 0) ? Direction.UP : Direction.DOWN;
        p.price = newPrice;
        p.direction = direction;
    })
}


setInterval(() => {
    recalculate(),
    redraw()
}, 2000)

// Lab-3

function calculateInitialPrice(ticker: string) : number {
    // with a real trading system, we'd obviously look up the price.
    // here, we're going to create one pseudorandomly
    return ticker.split('')
        .map(c => c.charCodeAt(0))
        .reduce((a, b) => a+b, 0) % 5000 / 100;
}

function getPrice(ticker: string) : Price {
    // first, check for an existing price
    let price = prices.find(p => p.ticker === ticker);
    if (price === undefined) {
        price = {
            ticker,
            price: calculateInitialPrice(ticker),
            direction: Direction.NONE
        }
        prices.push(price);
    }
    
    return price;
}

fdc3Ready().then(() => {

    window.fdc3.addIntentListener("ViewQuote", (instrument) => {
        if (instrument?.id?.ticker) {
            onScreenPrice = getPrice(instrument.id.ticker);
            redraw();
        }
    })

    window.fdc3.addContextListener("fdc3.instrument", (instrument) => {
        if (instrument?.id?.ticker) {
            onScreenPrice = getPrice(instrument.id.ticker);
            redraw();
        }
    })
})