let userCash = document.querySelector('.user_cash'),
    bills = document.querySelector('.bills'),
    coin = document.querySelector('.coin'),
    btnGetMoneyResult = document.querySelector('button'),
    convertationElem = document.querySelector('h5 span');

let url = 'http://api.bitcoincharts.com/v1/markets.json';
let response = fetch(url);
// let response = fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'API-Key': 'secret',
//         }
// });

let curs;

response 
    .then(response => response.json())
    .then(commits => {
        let uah = commits.find(cache => cache.currency == 'UAH');
        document.querySelector('h4 span').innerHTML = uah['latest_trade'];
        curs = uah['latest_trade'];
    })

// console.log(uah['latest_trade']);

document.querySelector('button').addEventListener('click', () => {
    let userValue = userCash.value;;
    if (userValue.includes(',')) {
        userValue = userValue.split(',').join('.');
    }
    calcBitcoin(userValue)
    moneySeparate(userValue.split('.'))
})

function moneySeparate(inpArray) {

    // Проверка грн
    if (inpArray[0] < 10) {
        bills.innerHTML = '0' + inpArray[0];
    } else {
        bills.innerHTML = inpArray[0];
    }

    // Проверка монет
    if (inpArray[1] == undefined ) {
        coin.innerHTML = '00';
    } else {
        if (inpArray[1].length == 1) {
            coin.innerHTML = +inpArray[1] + '0';
        } else if (inpArray[1].length == 2) {
            // if (inpArray[1] < 10) {
            //     coin.innerHTML = '0' + +inpArray[1];
            // } else {
            //     coin.innerHTML = inpArray[1];
            // }
            coin.innerHTML = inpArray[1] < 10 ?  '0' + +inpArray[1] : inpArray[1];

        } else if (inpArray[1].length >= 3) {
            let arrCoin = inpArray[1].split('')
            let newCoin = arrCoin.slice(0, 2);
            coin.innerHTML = newCoin.join('');
            console.log(arrCoin);
            alert(`Вы ввели неправильное значение копеек! Может Вы хотели ввести "${newCoin.join('')} коп.?"`);
        }
    }
    return  inpArray.join('.');;
}

function calcBitcoin(uah) {
    let sum = 1 / uah * curs;
    convertationElem.innerHTML = sum;
}


