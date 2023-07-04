
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
