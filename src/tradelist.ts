import { Channel, fdc3Ready } from "@finos/fdc3";

type StockItem = {
    ticker: string, 
    holding: number,
    value: number,
    channel?: Channel
}

let stockItems : StockItem[] = [ {
    ticker: 'TSLA',
    holding: 400,
    value: 0
}]

function addStock(ticker: string, holding: number) {
  const stock : StockItem = {
    ticker,
    holding,
    value: 0
  };

  stockItems.push(stock);
  render();
}

function removeStock(si: StockItem) {
    stockItems = stockItems.filter(e => e != si);
    render();
}

function renderStock(si: StockItem) : HTMLTableRowElement {
    const out : HTMLTableRowElement = document.createElement("tr");
    const ticker : HTMLTableCellElement = document.createElement("td");
    ticker.textContent = si.ticker;
    out.appendChild(ticker);
    const holding : HTMLTableCellElement = document.createElement("td");
    holding.textContent = ""+si.holding;
    out.appendChild(holding); 
    const price : HTMLTableCellElement = document.createElement("td");
    price.textContent = ""+si.value;
    out.appendChild(price);
    
    const value : HTMLTableCellElement = document.createElement("td");
    value.textContent = ""+(si.value*si.holding);
    out.appendChild(value);

    const buttons : HTMLTableCellElement = document.createElement("td");
    const remove : HTMLButtonElement = document.createElement("button");
    buttons.appendChild(remove);
    remove.textContent="X"
    remove.onclick = () => removeStock(si);
    out.appendChild(buttons);
    
    // lab-3
    if (window.fdc3) {
        // news button
        const ctx =  { type: "fdc3.instrument", id: { ticker: si.ticker }};

        const news : HTMLButtonElement = document.createElement("button");
        buttons.appendChild(news);
        news.textContent="News"
        news.onclick = () => window.fdc3.raiseIntent("ViewNews", ctx);

        // quote button
        const price : HTMLButtonElement = document.createElement("button");
        buttons.appendChild(price);
        price.textContent="Price"
        price.onclick = () => window.fdc3.raiseIntent("ViewQuote", ctx);
    }

    return out;
}

function render() {
    const stockList = document.getElementById("stock-list")!!
    while (stockList.lastElementChild) {
        stockList.removeChild(stockList.lastElementChild);
    }        

    stockItems.map(si => renderStock(si)).forEach(e => stockList.appendChild(e));

    const totalValue = stockItems
        .map(si => si.holding * si.value)
        .reduce((a,b) => a+b, 0);

    const totalStr = ""+totalValue

    document.getElementById("total")!!.textContent = totalStr;
}

const theForm = document.getElementById("js-form") as HTMLFormElement;

theForm.addEventListener("submit", event => {
    event.preventDefault();
    const ticker = document.getElementById("ticker") as HTMLInputElement;
    const holding = document.getElementById("holding") as HTMLInputElement;
    if ((ticker.value.length > 0) && (holding.value.length > 0)) {
        addStock(ticker.value, parseFloat(holding.value));
    }
});

window.addEventListener("load", _e => render());

// redraws the screen when FDC3 is enabled, in case we need to see the new buttons
fdc3Ready().then(() => {
    render()
    
    // lab-4
    setInterval(() => {
        // check channels exist
        stockItems.forEach(s => {
            if (!s.channel) {
                const name = "prices-"+s.ticker;
                window.fdc3.getOrCreateChannel(name).then(c => {
                    s.channel = c;
                    c.addContextListener("fdc3.valuation", valuation => {
                        if (valuation?.value) {
                            s.value = parseFloat((Math.round(valuation.value * 100) / 100).toFixed(2));
                        }
                    });
                    console.log("Listening on "+name)
                });
            }
        })
    })

    setInterval(render, 500);
});
