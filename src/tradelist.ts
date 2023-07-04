type StockItem = {
    ticker: string, 
    holding: number,
    value: number
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
    const value : HTMLTableCellElement = document.createElement("td");
    value.textContent = ""+si.value;
    out.appendChild(value);
    const remove : HTMLTableCellElement = document.createElement("td");
    const button : HTMLButtonElement = document.createElement("button");
    remove.appendChild(button);
    button.textContent="Remove"
    button.onclick = () => removeStock(si);
    out.appendChild(remove);
    return out;
}

function render() {
    const stockList = document.getElementById("stock-list")!!
    while (stockList.lastElementChild) {
        stockList.removeChild(stockList.lastElementChild);
    }        

    stockItems.map(si => renderStock(si)).forEach(e => stockList.appendChild(e));
}

const theForm = document.getElementById("js-form") as HTMLFormElement;

theForm.addEventListener("submit", event => {
    event.preventDefault();
    addStock(theForm.children['ticker'].value,theForm.children['holding'].value);
});

window.addEventListener("load", _e => render());

// const form = document.querySelector(".js-form");
// form.addEventListener("submit", event => {
//   const input = document.querySelector(".js-todo-input");

//   const text = input.value.trim();
//   if (text !== "") {
//     addTodo(text);
//     input.value = "";
//     input.focus();
//   }
// });

// const list = document.querySelector(".js-todo-list");
// list.addEventListener("click", event => {
//   if (event.target.classList.contains("js-tick")) {
//     const itemKey = event.target.parentElement.dataset.key;
//     toggleDone(itemKey);
//   }

//   if (event.target.classList.contains("js-delete-todo")) {
//     const itemKey = event.target.parentElement.dataset.key;
//     deleteTodo(itemKey);
//   }
// });
