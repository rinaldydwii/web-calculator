const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        let d1 = document.createElement('td');
        d1.innerText = history.firstNumber;
        row.append(d1);
        let d2 = document.createElement('td');
        d2.innerHTML = history.operator;
        row.append(d2);
        let d3 = document.createElement('td');
        d3.innerHTML = history.secondNumber;
        row.append(d3);
        let d4 = document.createElement('td');
        d4.innerHTML = history.result;
        row.append(d4);

        historyList.appendChild(row);
    }
}

renderHistory();