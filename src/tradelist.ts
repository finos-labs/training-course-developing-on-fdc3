// lab-8
type StockItem = {
    ticker: string, 
    holding: number,
    value: number,
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
    value.textContent = (si.value*si.holding).toFixed(2);
    out.appendChild(value);

    const buttons : HTMLTableCellElement = document.createElement("td");
    const remove : HTMLButtonElement = document.createElement("button");
    buttons.appendChild(remove);
    remove.textContent="X"
    remove.onclick = () => removeStock(si);
    out.appendChild(buttons);
    
    // lab-4

    // lab-6

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
        .reduce((a,b) => a+b, 0)
        .toFixed(2);

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


// lab-4
 
// lab-8



    

    