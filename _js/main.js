const currencySelects = document.querySelectorAll('select');
const currencyOne = document.getElementById('primarySelect');
const amountOne = document.getElementById('primaryCurrency');
const currencyTwo = document.getElementById('secondarySelect');
const amountTwo = document.getElementById('secondCurrency');
const swap = document.getElementById('swap');


// Alimentando os selects com as moedas correntes
fetch('https://api.exchangeratesapi.io/latest')
    .then(resp => {
        return resp.json();
    }).then(data => {
        currencySelects.forEach(select => {
            selectGenerator(select, Object.keys(data.rates));
        });

        // Definindo os valores iniciais dos selects
        currencySelects[0].value = 'USD';
        currencySelects[1].value = 'BRL';
    });

amountOne.addEventListener('input', () => {
    calculate();
});
currencyOne.addEventListener('change', () => {
    calculate();
});
amountTwo.addEventListener('input', () => {
    calculate();
});
currencyTwo.addEventListener('change', () => {
    calculate();
});
swap.addEventListener('click', () => {
    swapCurrency();
});

// ***** ANIMANDO O CLICK DO BOTAO ******
swap.addEventListener('mousedown', () => {
    swap.classList.add('currency__swap--click');
});
swap.addEventListener('mouseup', () => {
    swap.classList.remove('currency__swap--click');
});


// ***** REALIZANDO A TROCA DAS MOEDAS NOS SELECTS E RECALCULANDO *****
function swapCurrency() {
    const currentCurrency = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = currentCurrency;
    calculate();
}

// ***** FAZENDO O CÁLCULO E ADICONANDO O VALOR AO INPUT DE DESTINO ******
function calculate() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne.value}`)
        .then(resp => resp.json())
        .then(data => {
            amountTwo.value = (amountOne.value * data.rates[currencyTwo.value]).toFixed(2);
        });
}

// ***** CRIANDO UM OPTION *****
function createOption(value) {
    const el = document.createElement('option');
    el.innerHTML = value;

    return el;
}

// ***** POPULANDO O SELECT *****
function selectGenerator(select, values) {
    let fragment = document.createDocumentFragment();
    values.sort();

    for (let i = 0; i < values.length; i++) {
        fragment.appendChild(createOption(values[i]));
    }

    select.appendChild(fragment);
}

