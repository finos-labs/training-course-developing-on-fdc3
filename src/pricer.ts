enum Direction { UP, DOWN, NONE }

// lab-9
type Price = {
    ticker: string,
    price: number,
    direction: Direction
}

function calculateInitialPrice(ticker: string) : number {
    // with a real trading system, we'd obviously look up the price.
    // here, we're going to create one pseudorandomly
    return ticker.split('')
        .map(c => c.charCodeAt(0))
        .reduce((a, b) => a+(b*7), 0) % 5000 / 100;
}

const prices : Price[] = [{ ticker: "TSLA", price: calculateInitialPrice("TSLA"), direction: Direction.NONE }];

var onScreenPrice : Price = prices[0]

function redrawChooser() {

    const select = document.getElementById("chooser")!!
    while (select.lastElementChild) {
        select.removeChild(select.lastElementChild);
    }    

    prices.forEach(p => {
        const option = document.createElement("option");
        option.selected = p === onScreenPrice;
        option.textContent = p.ticker
        option.value = p.ticker
        select.appendChild(option);
    })
}

function redrawPrice() {
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

        // lab-9
    })
}

setInterval(() => {
    recalculate(),
    redrawPrice()
}, 2000)


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

function changePrice(ticker: string) {
    if (ticker !== onScreenPrice.ticker) {
        const p = getPrice(ticker);
        onScreenPrice = p;
        redrawChooser();
        redrawPrice();

        // lab-8
    }
}

window.addEventListener("load", () => {
    const select = document.getElementById("chooser") as HTMLSelectElement
    select.addEventListener("change", () => {
        const ticker = select.options[select.selectedIndex];
        changePrice(ticker.value);
     })

})

// lab-6

// lab-8

// lab-9
